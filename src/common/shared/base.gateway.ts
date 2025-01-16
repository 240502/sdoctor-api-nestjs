import { Injectable } from '@nestjs/common';
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
@Injectable()
export class SocketGateway {
  @WebSocketServer()
  protected server: Server;
  private connectedClients = new Set<string>(); // Set chứa socketId
  private clientRooms: Map<string, string> = new Map(); // Map socketId -> roomName

  /**
   * Client connection
   * @param client socket of client
   */
  handleConnection(client: Socket): void {
    if (!this.connectedClients.has(client.id)) {
      this.connectedClients.add(client.id);
      console.log('Client connected:', client.id); // Log chỉ 1 lần khi client mới kết nối
    }
    // Nếu client đã có room trước đó, tự động join lại
    const roomName = this.clientRooms.get(client.id);
    if (roomName) {
      client.join(roomName);
      console.log(`Client ${client.id} rejoined room: ${roomName}`);
    }
    console.log(
      'Total connected clients:',
      this.connectedClients.size,
    ); // Log số lượng kết nối
  }

  /**
   * Client disconnection
   * @param client socket of client
   */
  handleDisconnect(client: Socket): void {
    const roomName = this.clientRooms.get(client.id);
    console.log(roomName);
    // this.clientRooms.delete(client.id); // Xóa thông tin khi client ngắt kết nối
    this.connectedClients.delete(client.id);
    console.log(`Client disconnected: ${client.id}`);
  }

  /**
   * Client join room
   * @param userId ID người dùng
   * @param client socket của client
   */
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() { userId }: { userId: number },
    @ConnectedSocket() client: Socket,
  ): void {
    const roomName = `user:${userId}`;
    const currentRoom = this.clientRooms.get(client.id);

    if (currentRoom === roomName) {
      console.log(
        `Client ${client.id} is already in room: ${roomName}`,
      );
      return; // Nếu client đã ở trong room này, không cần xử lý thêm
    }

    // Lưu thông tin room mới
    this.clientRooms.set(client.id, roomName);
    client.join(roomName);
    console.log(`Client ${client.id} joined room: ${roomName}`);
  }

  /**
   * Emit a event to all clients
   * @param event: event name
   * @param data: data to send
   * */
  emitToAll(event: string, data: any): void {
    this.server.emit(event, data);
  }

  /**
   * Emit a event to a room
   * @param roomName: name of the room
   * @param event: event name
   * @param data: data to send
   * */
  emitToRoom(roomName: string, event: string, data: any): void {
    this.server.to(roomName).emit(event, data);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() roomName: string,
    @ConnectedSocket() socket: Socket,
  ): void {
    // Kiểm tra nếu client đang ở trong phòng
    const currentRoom = this.clientRooms.get(socket.id);
    if (currentRoom !== roomName) {
      console.log(`Client ${socket.id} is not in room: ${roomName}`);
      return;
    }

    socket.leave(roomName);

    // Kiểm tra phòng trong adapter
    const room = this.server.sockets.adapter.rooms.get(roomName);
    console.log('Checking room:', roomName, room); // Debug log

    if (room && room.size > 0) {
    } else {
      this.clientRooms.delete(socket.id);
    }

    // Xóa thông tin phòng khỏi clientRooms
  }
}
