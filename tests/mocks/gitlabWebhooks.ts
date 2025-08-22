// tests/mocks/gitlabWebhooks.ts

export const mockMergeRequestPayload = {
  object_kind: 'merge_request',
  object_attributes: {
    id: 123,
    title: 'Add new feature',
    description: 'This adds a new feature to the system',
    state: 'opened',
    merge_status: 'unchecked',
    target_branch: 'main',
    source_branch: 'feature/new-feature',
    url: 'https://gitlab.com/group/project/merge_requests/123',
    assignee_ids: [456],
    author_id: 789,
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z'
  },
  user: {
    id: 789,
    name: 'John Doe',
    username: 'johndoe'
  },
  project: {
    id: 1,
    name: 'Test Project',
    path_with_namespace: 'group/test-project'
  }
};

export const mockNotePayload = {
  object_kind: 'note',
  object_attributes: {
    id: 456,
    note: 'This looks good! <@123> please review the changes.',
    noteable_type: 'MergeRequest',
    noteable_id: 123,
    in_reply_to_id: null,
    url: 'https://gitlab.com/group/project/merge_requests/123#note_456'
  },
  user: {
    id: 789,
    name: 'Jane Smith',
    username: 'janesmith'
  },
  project: {
    id: 1,
    name: 'Test Project',
    path_with_namespace: 'group/test-project'
  }
};

export const mockReplyNotePayload = {
  object_kind: 'note',
  object_attributes: {
    id: 457,
    note: 'I agree with the previous comment',
    noteable_type: 'MergeRequest',
    noteable_id: 123,
    in_reply_to_id: 456,
    url: 'https://gitlab.com/group/project/merge_requests/123#note_457'
  },
  user: {
    id: 790,
    name: 'Bob Wilson',
    username: 'bobwilson'
  },
  project: {
    id: 1,
    name: 'Test Project',
    path_with_namespace: 'group/test-project'
  }
};

export const mockCommitNotePayload = {
  object_kind: 'note',
  object_attributes: {
    id: 458,
    note: 'Good commit message',
    noteable_type: 'Commit',
    noteable_id: 'abc123',
    in_reply_to_id: null,
    url: 'https://gitlab.com/group/project/commit/abc123#note_458'
  },
  user: {
    id: 789,
    name: 'Jane Smith',
    username: 'janesmith'
  },
  project: {
    id: 1,
    name: 'Test Project',
    path_with_namespace: 'group/test-project'
  }
};

export const mockPushPayload = {
  object_kind: 'push',
  object_attributes: {
    ref: 'refs/heads/main',
    before: 'abc123',
    after: 'def456'
  },
  user: {
    id: 789,
    name: 'John Doe',
    username: 'johndoe'
  },
  project: {
    id: 1,
    name: 'Test Project',
    path_with_namespace: 'group/test-project'
  }
};
