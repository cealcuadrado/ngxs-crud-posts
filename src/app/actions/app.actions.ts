export class GetPosts {
  static readonly type = 'Get Posts';
}

export class AddPosts {
  static readonly type = 'Add Posts';

  constructor(public payload: any) {}
}

export class DeletePosts {
  static readonly type = 'Delete Posts';

  constructor(public id: number) {}
}

