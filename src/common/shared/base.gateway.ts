import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors: { origin: '*' },
})
export abstract class BaseGateway {
  @WebSocketServer()
  protected server: Server;
  private connectedClients: Map<string, string> = new Map(); // Map socketId -> userId/doctorId
  /**
   * Client connection
   * @param client socket of client
   */
  handleConnection(client: Socket): void {
    console.log(`Client connected ${client.id}`);
  }
  /**
   * Client disconnection
   * @param client socket of client
   */
  handleDisconnect(client: Socket): void {
    console.log(`Client disconnected ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() { userId }: { userId: number },
    @ConnectedSocket() client: Socket,
  ): void {
    const roomName = `user:${userId}`;
    client.join(roomName);
    this.connectedClients.set(client.id, roomName);
    console.log(`Doctor ${userId} joined room: ${roomName}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@ConnectedSocket() client: Socket): void {
    const roomName = this.connectedClients.get(client.id);
    if (roomName) {
      client.leave(roomName);
      this.connectedClients.delete(client.id);
      console.log(`Client ${client.id} left room: ${roomName}`);
    }
  }

  /**
   * Emit a event to all clients
   * @param event: event name
   * @param data: data to send
   * */
  protected emitToAll(event: string, data: any): void {
    this.server.emit(event, data);
  }

  /**
   * Emit a event to a room
   * @param roomName: name of the room
   * @param event: event name
   * @param data: data to send
   * */
  protected emitToRoom(
    roomName: string,
    event: string,
    data: any,
  ): void {
    this.server.to(roomName).emit(event, data);
  }
}
