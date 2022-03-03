export class GetPosts {
  static readonly type = 'Get Posts';
}

export class AddPosts {
  static readonly type = 'Add Posts';

  constructor(public payload: any) {}
}
