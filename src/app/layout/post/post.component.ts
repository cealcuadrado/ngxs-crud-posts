import { Post } from './../../interfaces/post';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post = {
    userId: 0,
    id: 0,
    title: 'Title',
    body: 'Body'
  };

  @Output() update = new EventEmitter<Post>();
  @Output() delete = new EventEmitter<Post>();

  constructor() { }

  ngOnInit(): void {
  }

  updatePost(): void {
    this.update.emit(this.post);
  }

  deletePost(): void {
    this.delete.emit(this.post);
  }

}
