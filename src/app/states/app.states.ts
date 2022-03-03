import { GetPosts, AddPosts, DeletePosts } from './../actions/app.actions';
import { PostService } from './../services/post.service';
import { Injectable } from '@angular/core';
import { Action, State, Selector, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';

export class PostStateModel {
  posts: any;
}

@State<PostStateModel>({
  name: 'appstate',
  defaults: {
    posts: []
  }
})

@Injectable()
export class AppState {
  constructor(private _post: PostService) {}

  @Selector()
  static selectStateData(state: PostStateModel) {
    return state.posts
  }

  @Action(GetPosts)
  getDataFromState(ctx: StateContext<PostStateModel>) {
    return this._post.fetchPosts().pipe(
      tap(
        returnData => {
          const state = ctx.getState();

          ctx.setState({
            ...state,
            posts: returnData
          });
        }
      )
    );
  }

  @Action(AddPosts)
  addDataToState(ctx: StateContext<PostStateModel>, {payload}:AddPosts) {
    return this._post.addPost(payload).pipe(
      tap(
        returnData => {
          const state = ctx.getState();

          ctx.patchState({
            posts: [...state.posts, returnData]
          });
        }
      )
    )
  }

  @Action(DeletePosts)
  deleteDataFromState(ctx: StateContext<PostStateModel>, { id }: DeletePosts) {
    return this._post.deletePost(id).pipe(
      tap(
        returnData => {
          const state = ctx.getState();

          let updatedPosts = state.posts.filter(post => post.id !== id);

          ctx.setState({
            ...state,
            posts: updatedPosts
          });
        }
      )
    );
  }
}

