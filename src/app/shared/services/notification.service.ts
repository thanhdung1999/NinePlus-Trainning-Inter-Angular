import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private message: string | null = null;

  addMessage(message: string) {
    this.message = message;
  }

  getMessage(): string | null {
    return this.message;
  }

  clearMessage() {
    this.message = null;
  }
}
