// src/app/components/chat-detail/chat-detail.component.ts

import { Component, input, effect, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { useAuthStore } from '../stores/auth.store';
import { useChatStore } from '../stores/chat.store';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-chat-detail',
  standalone: true,
  imports: [FormsModule, DatePipe, NgClass, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <div class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-900">Chat</h2>
            <a
              routerLink="/chats"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
            >
              Back to Chats
            </a>
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div class="px-4 py-6 sm:px-0">
            <div class="space-y-4">
              @for (message of chatStore.messages(); track message.id) {
              <div
                class="flex"
                [ngClass]="{
                  'justify-end':
                    message.senderId === authStore.currentUser()?.uid
                }"
              >
                <div
                  class="max-w-xl px-4 py-2 rounded-lg"
                  [ngClass]="{
                    'bg-indigo-100':
                      message.senderId === authStore.currentUser()?.uid,
                    'bg-gray-200':
                      message.senderId !== authStore.currentUser()?.uid
                  }"
                >
                  @if (message.type !== "text") {
                    <img class="max-w-[150px]" [src]="message['text']" alt="image" />
                  } @else {
                    <p class="text-sm text-gray-900">{{ message.text }}</p>
                  }

                  <p class="mt-1 text-xs text-gray-500">
                    {{ message.timestamp.toDate() | date : 'short' }}
                  </p>
                </div>
              </div>
              }
            </div>

            @if (chatStore.messages().length === 0) {
            <p class="text-gray-500">No messages yet.</p>
            }
          </div>
        </div>
      </div>

    <div class="bg-navy-10 w-full shadow-[0_35px_60px_-15px_rgba(0,0,0,1)] min-h-32 h-auto bottom-0 fixed">
        <div class="flex-wrap flex w-5/6 mx-auto">
          <input type="file" class="file-input hidden" (change)="this.sendImageMessage($event)" #fileUpload>
          <button color="primary" class="w-16 h-16 rounded-full bg-amber-800 my-3" (click)="fileUpload.click()">
              #
          </button>

          <textarea
                class="w-4/5 mx-auto h-16 rounded-3xl my-auto overflow-scroll text-gray-900 dark:placeholder-gray-400 p-4"
                placeholder="Write your thoughts here..." [(ngModel)]="this.newMessage"></textarea>
            <button class="w-16 h-16 rounded-full bg-amber-800 my-3" (click)="sendMessage()">
                ->
            </button>
        </div>
      </div>
    </div>
  `,
})
export class ChatDetailComponent implements OnInit {
  chatId = input.required<string>();
  chatStore = inject(useChatStore);
  authStore = inject(useAuthStore);
  newMessage = '';

  ngOnInit() {
    this.chatStore.listenToMessages(this.chatId());
  }

  sendMessage() {
    if (this.newMessage.trim() && this.authStore.currentUser()) {
      this.chatStore.sendMessage(
        this.chatId(),
        this.authStore.currentUser()!.uid,
        this.newMessage
      );
      this.newMessage = '';
    }
  }

  sendImageMessage(event: any) {
    const imgFile: File = event.target.files[0];
    if (!imgFile) {
      return;
    }
    this.chatStore.sendImageMessage(
      this.chatId(),
      this.authStore.currentUser()!.uid,
      imgFile
    );
  }
}
