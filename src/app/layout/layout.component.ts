import { GetPosts, DeletePosts, UpdatePosts, AddPosts } from './../actions/app.actions';
import { Observable } from 'rxjs';
import { AppState } from './../states/app.states';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../interfaces/post';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  postForm: FormGroup;

  posts: Post[] = [];
  @Select(AppState.selectStateData) posts$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      userId: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required])
    });

    this.store.dispatch(new GetPosts());

    this.posts$.subscribe(returnData => {
      this.posts = returnData;
    });
  }

  onSubmit(): void {
    this.store.dispatch(new AddPosts(this.postForm.value));
    this.postForm.reset();
  }

  colorInvalidInput(field: string) {
    let formField = this.postForm.controls[field];
    return { 'border-danger': formField.touched && formField.invalid };
  }

  isInvalidInput(field: string): boolean {
    let formField = this.postForm.controls[field];
    return formField.touched && formField.invalid;
  }

  updatePost(post: Post, id: number, index: number): void {
    let updatePost: Post = {
      userId: 201,
      id: 501,
      title: 'Updated title',
      body: 'Updated body'
    };

    this.store.dispatch(new UpdatePosts(updatePost, id, index));
  }

  deletePost(post: Post): void {
    this.store.dispatch(new DeletePosts(post.id));
  }
}
