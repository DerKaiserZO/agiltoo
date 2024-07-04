import { EpicLink, Item, Owner, Priority, Project, Status, Tag, Task, Type } from "./layout/shared/items-list/item.model";

export const tickets: Item[] = [
  {
    id: 1,
    project: { id: 2, name: 'DASHBOARD APPS' },
    type: { id: 1, name: 'Story' },
    title: 'todo 1',
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae accusantium rem architecto deleniti, quaerat, repellendus quae delectus illum fugit recusandae nostrum quia nesciunt, fugiat eveniet porro excepturi quam cupiditate nulla.`,
    comment: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae accusantium rem architecto deleniti, quaerat, repellendus quae delectus illum fugit recusandae nostrum quia nesciunt, fugiat eveniet porro excepturi quam cupiditate nulla.
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae accusantium rem architecto deleniti, quaerat, repellendus quae delectus illum fugit recusandae nostrum quia nesciunt, fugiat eveniet porro excepturi quam cupiditate nulla.
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae accusantium rem architecto deleniti, quaerat, repellendus quae delectus illum fugit recusandae nostrum quia nesciunt, fugiat eveniet porro excepturi quam cupiditate nulla.`,
    storyPoint: 3,
    priority: { id: 2, name: 'High' },
    status: { id: 2, name: 'In Progress' },
    tag: { id: 1, name: '#portfolio' },
    epicLink: { id: 1, name: 'service Admin' },
    owner: { id: 2, name: 'abdou' },
    responsible: null,
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description for task 1',
        comment: 'Comment for task 1',
        storyPoint: 3,
        priority: { id: 1, name: 'High' },
        status: { id: 1, name: 'To Do' },
        owner: { id: 1, name: 'Alice' },
        responsible: null,
        createdOn: '2023-01-01T10:00:00Z',
        updatedOn: '2023-01-02T10:00:00Z'
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description for task 2',
        comment: 'Comment for task 2',
        storyPoint: 5,
        priority: { id: 2, name: 'Medium' },
        status: { id: 2, name: 'In Progress' },
        owner: { id: 2, name: 'Bob' },
        responsible: null,
        createdOn: '2023-01-02T10:00:00Z',
        updatedOn: '2023-01-03T10:00:00Z'
      },
      {
        id: 3,
        title: 'Task 3',
        description: 'Description for task 3',
        comment: 'Comment for task 3',
        storyPoint: 8,
        priority: { id: 3, name: 'Low' },
        status: { id: 3, name: 'Done' },
        owner: { id: 3, name: 'Charlie' },
        responsible: null,
        createdOn: '2023-01-03T10:00:00Z',
        updatedOn: '2023-01-04T10:00:00Z'
      },
      {
        id: 4,
        title: 'Task 4',
        description: 'Description for task 4',
        comment: 'Comment for task 4',
        storyPoint: 2,
        priority: { id: 1, name: 'High' },
        status: { id: 1, name: 'To Do' },
        owner: { id: 4, name: 'David' },
        responsible: null,
        createdOn: '2023-01-04T10:00:00Z',
        updatedOn: '2023-01-05T10:00:00Z'
      }
    ],
    createdOn: '2023-07-18T12:41:21.041Z',
    updatedOn: '2023-07-18T12:41:21.041Z'
  },
  {
    id: 2,
    project: { id: 3, name: 'MOBILE APP' },
    type: { id: 2, name: 'Bug' },
    title: 'todo 2',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae accusantium rem architecto deleniti, quaerat, repellendus quae delectus illum fugit recusandae nostrum quia nesciunt, fugiat eveniet porro excepturi quam cupiditate nulla. 2',
    comment: 'comment 2',
    storyPoint: 5,
    priority: { id: 1, name: 'Medium' },
    status: { id: 1, name: 'To Do' },
    tag: { id: 2, name: '#mobile' },
    epicLink: { id: 2, name: 'client Module' },
    owner: { id: 3, name: 'mohamed' },
    responsible: { id: 4, name: 'ayesha' },
    tasks: [
      {
        id: 5,
        title: 'Task 5',
        description: 'Description for task 5',
        comment: 'Comment for task 5',
        storyPoint: 3,
        priority: { id: 2, name: 'Medium' },
        status: { id: 2, name: 'In Progress' },
        owner: { id: 5, name: 'Eve' },
        responsible: null,
        createdOn: '2023-01-05T10:00:00Z',
        updatedOn: '2023-01-06T10:00:00Z'
      },
      {
        id: 6,
        title: 'Task 6',
        description: 'Description for task 6',
        comment: 'Comment for task 6',
        storyPoint: 4,
        priority: { id: 3, name: 'Low' },
        status: { id: 3, name: 'Done' },
        owner: { id: 1, name: 'Alice' },
        responsible: null,
        createdOn: '2023-01-06T10:00:00Z',
        updatedOn: '2023-01-07T10:00:00Z'
      },
      {
        id: 7,
        title: 'Task 7',
        description: 'Description for task 7',
        comment: 'Comment for task 7',
        storyPoint: 1,
        priority: { id: 1, name: 'High' },
        status: { id: 1, name: 'To Do' },
        owner: { id: 2, name: 'Bob' },
        responsible: null,
        createdOn: '2023-01-07T10:00:00Z',
        updatedOn: '2023-01-08T10:00:00Z'
      },
      {
        id: 8,
        title: 'Task 8',
        description: 'Description for task 8',
        comment: 'Comment for task 8',
        storyPoint: 2,
        priority: { id: 2, name: 'Medium' },
        status: { id: 2, name: 'In Progress' },
        owner: { id: 3, name: 'Charlie' },
        responsible: null,
        createdOn: '2023-01-08T10:00:00Z',
        updatedOn: '2023-01-09T10:00:00Z'
      }
    ],
    createdOn: '2023-07-19T14:21:11.021Z',
    updatedOn: '2023-07-19T14:21:11.021Z'
  },
  {
    id: 3,
    project: { id: 2, name: 'DASHBOARD APPS' },
    type: { id: 3, name: 'Task' },
    title: 'todo 3',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae accusantium rem architecto deleniti, quaerat, repellendus quae delectus illum fugit recusandae nostrum quia nesciunt, fugiat eveniet porro excepturi quam cupiditate nulla. 3',
    comment: 'comment 3',
    storyPoint: 2,
    priority: { id: 3, name: 'Low' },
    status: { id: 3, name: 'Done' },
    tag: { id: 1, name: '#portfolio' },
    epicLink: { id: 1, name: 'service Admin' },
    owner: { id: 2, name: 'abdou' },
    responsible: null,
    tasks: [{
      id: 9,
      title: 'Task 9',
      description: 'Description for task 9',
      comment: 'Comment for task 9',
      storyPoint: 5,
      priority: { id: 3, name: 'Low' },
      status: { id: 3, name: 'Done' },
      owner: { id: 4, name: 'David' },
      responsible: null,
      createdOn: '2023-01-09T10:00:00Z',
      updatedOn: '2023-01-10T10:00:00Z'
    },
    {
      id: 10,
      title: 'Task 10',
      description: 'Description for task 10',
      comment: 'Comment for task 10',
      storyPoint: 3,
      priority: { id: 1, name: 'High' },
      status: { id: 1, name: 'To Do' },
      owner: { id: 5, name: 'Eve' },
      responsible: null,
      createdOn: '2023-01-10T10:00:00Z',
      updatedOn: '2023-01-11T10:00:00Z'
    },
    {
      id: 11,
      title: 'Task 11',
      description: 'Description for task 11',
      comment: 'Comment for task 11',
      storyPoint: 6,
      priority: { id: 2, name: 'Medium' },
      status: { id: 2, name: 'In Progress' },
      owner: { id: 1, name: 'Alice' },
      responsible: null,
      createdOn: '2023-01-11T10:00:00Z',
      updatedOn: '2023-01-12T10:00:00Z'
    },
    {
      id: 12,
      title: 'Task 12',
      description: 'Description for task 12',
      comment: 'Comment for task 12',
      storyPoint: 2,
      priority: { id: 3, name: 'Low' },
      status: { id: 3, name: 'Done' },
      owner: { id: 2, name: 'Bob' },
      responsible: null,
      createdOn: '2023-01-12T10:00:00Z',
      updatedOn: '2023-01-13T10:00:00Z'
    }],
    createdOn: '2023-07-20T08:41:21.041Z',
    updatedOn: '2023-07-20T08:41:21.041Z'
  },
  {
    id: 4,
    project: { id: 3, name: 'MOBILE APP' },
    type: { id: 1, name: 'Story' },
    title: 'todo 4',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae accusantium rem architecto deleniti, quaerat, repellendus quae delectus illum fugit recusandae nostrum quia nesciunt, fugiat eveniet porro excepturi quam cupiditate nulla. 4',
    comment: 'comment 4',
    storyPoint: 8,
    priority: { id: 2, name: 'High' },
    status: { id: 2, name: 'In Progress' },
    tag: { id: 2, name: '#mobile' },
    epicLink: { id: 2, name: 'client Module' },
    owner: { id: 3, name: 'mohamed' },
    responsible: { id: 4, name: 'ayesha' },
    tasks:[{
      id: 13,
      title: 'Task 13',
      description: 'Description for task 13',
      comment: 'Comment for task 13',
      storyPoint: 7,
      priority: { id: 1, name: 'High' },
      status: { id: 1, name: 'To Do' },
      owner: { id: 3, name: 'Charlie' },
      responsible: null,
      createdOn: '2023-01-13T10:00:00Z',
      updatedOn: '2023-01-14T10:00:00Z'
    },
    {
      id: 14,
      title: 'Task 14',
      description: 'Description for task 14',
      comment: 'Comment for task 14',
      storyPoint: 4,
      priority: { id: 2, name: 'Medium' },
      status: { id: 2, name: 'In Progress' },
      owner: { id: 4, name: 'David' },
      responsible: null,
      createdOn: '2023-01-14T10:00:00Z',
      updatedOn: '2023-01-15T10:00:00Z'
    },
    {
      id: 15,
      title: 'Task 15',
      description: 'Description for task 15',
      comment: 'Comment for task 15',
      storyPoint: 3,
      priority: { id: 3, name: 'Low' },
      status: { id: 3, name: 'Done' },
      owner: { id: 5, name: 'Eve' },
      responsible: null,
      createdOn: '2023-01-15T10:00:00Z',
      updatedOn: '2023-01-16T10:00:00Z'
    },
    {
      id: 16,
      title: 'Task 16',
      description: 'Description for task 16',
      comment: 'Comment for task 16',
      storyPoint: 5,
      priority: { id: 1, name: 'High' },
      status: { id: 1, name: 'To Do' },
      owner: { id: 1, name: 'Alice' },
      responsible: null,
      createdOn: '2023-01-16T10:00:00Z',
      updatedOn: '2023-01-17T10:00:00Z'
    }],
    createdOn: '2023-07-21T10:31:11.021Z',
    updatedOn: '2023-07-21T10:31:11.021Z'
  },
  {
    id: 5,
    project: { id: 2, name: 'DASHBOARD APPS' },
    type: { id: 2, name: 'Bug' },
    title: 'todo 5',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae accusantium rem architecto deleniti, quaerat, repellendus quae delectus illum fugit recusandae nostrum quia nesciunt, fugiat eveniet porro excepturi quam cupiditate nulla. 5',
    comment: 'comment 5',
    storyPoint: 1,
    priority: { id: 1, name: 'Medium' },
    status: { id: 1, name: 'To Do' },
    tag: { id: 1, name: '#portfolio' },
    epicLink: { id: 1, name: 'service Admin' },
    owner: { id: 2, name: 'abdou' },
    responsible: null,
    tasks: [{
      id: 17,
      title: 'Task 17',
      description: 'Description for task 17',
      comment: 'Comment for task 17',
      storyPoint: 6,
      priority: { id: 2, name: 'Medium' },
      status: { id: 2, name: 'In Progress' },
      owner: { id: 2, name: 'Bob' },
      responsible: null,
      createdOn: '2023-01-17T10:00:00Z',
      updatedOn: '2023-01-18T10:00:00Z'
    },
    {
      id: 18,
      title: 'Task 18',
      description: 'Description for task 18',
      comment: 'Comment for task 18',
      storyPoint: 4,
      priority: { id: 3, name: 'Low' },
      status: { id: 3, name: 'Done' },
      owner: { id: 3, name: 'Charlie' },
      responsible: null,
      createdOn: '2023-01-18T10:00:00Z',
      updatedOn: '2023-01-19T10:00:00Z'
    },
    {
      id: 19,
      title: 'Task 19',
      description: 'Description for task 19',
      comment: 'Comment for task 19',
      storyPoint: 3,
      priority: { id: 1, name: 'High' },
      status: { id: 1, name: 'To Do' },
      owner: { id: 4, name: 'David' },
      responsible: null,
      createdOn: '2023-01-19T10:00:00Z',
      updatedOn: '2023-01-20T10:00:00Z'
    },
    {
      id: 20,
      title: 'Task 20',
      description: 'Description for task 20',
      comment: 'Comment for task 20',
      storyPoint: 2,
      priority: { id: 2, name: 'Medium' },
      status: { id: 2, name: 'In Progress' },
      owner: { id: 5, name: 'Eve' },
      responsible: null,
      createdOn: '2023-01-20T10:00:00Z',
      updatedOn: '2023-01-21T10:00:00Z'
    }],
    createdOn: '2023-07-22T12:41:21.041Z',
    updatedOn: '2023-07-22T12:41:21.041Z'
  },
  {
    id: 6,
    project: { id: 4, name: 'WEB PLATFORM' },
    type: { id: 1, name: 'Story' },
    title: 'todo 6',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae accusantium rem architecto deleniti, quaerat, repellendus quae delectus illum fugit recusandae nostrum quia nesciunt, fugiat eveniet porro excepturi quam cupiditate nulla. 6',
    comment: 'comment 6',
    storyPoint: 3,
    priority: { id: 3, name: 'Low' },
    status: { id: 3, name: 'Done' },
    tag: { id: 3, name: '#web' },
    epicLink: { id: 3, name: 'web Module' },
    owner: { id: 5, name: 'fatima' },
    responsible: { id: 6, name: 'khalid' },
    createdOn: '2023-07-23T15:41:21.041Z',
    updatedOn: '2023-07-23T15:41:21.041Z'
  },
  {
    id: 7,
    project: { id: 2, name: 'DASHBOARD APPS' },
    type: { id: 3, name: 'Task' },
    title: 'todo 7',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae accusantium rem architecto deleniti, quaerat, repellendus quae delectus illum fugit recusandae nostrum quia nesciunt, fugiat eveniet porro excepturi quam cupiditate nulla. 7',
    comment: 'comment 7',
    storyPoint: 5,
    priority: { id: 2, name: 'High' },
    status: { id: 2, name: 'In Progress' },
    tag: { id: 1, name: '#portfolio' },
    epicLink: { id: 1, name: 'service Admin' },
    owner: { id: 2, name: 'abdou' },
    responsible: null,
    createdOn: '2023-07-24T17:41:21.041Z',
    updatedOn: '2023-07-24T17:41:21.041Z'
  },
  {
    id: 8,
    project: { id: 4, name: 'WEB PLATFORM' },
    type: { id: 2, name: 'Bug' },
    title: 'todo 8',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae accusantium rem architecto deleniti, quaerat, repellendus quae delectus illum fugit recusandae nostrum quia nesciunt, fugiat eveniet porro excepturi quam cupiditate nulla. 8',
    comment: 'comment 8',
    storyPoint: 2,
    priority: { id: 1, name: 'Medium' },
    status: { id: 1, name: 'To Do' },
    tag: { id: 3, name: '#web' },
    epicLink: { id: 3, name: 'web Module' },
    owner: { id: 5, name: 'fatima' },
    responsible: { id: 6, name: 'khalid' },
    createdOn: '2023-07-25T18:41:21.041Z',
    updatedOn: '2023-07-25T18:41:21.041Z'
  },
  {
    id: 9,
    project: { id: 1, name: 'PORTAIL PORTFOLIO' },
    type: { id: 1, name: 'Story' },
    title: 'todo 9',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae accusantium rem architecto deleniti, quaerat, repellendus quae delectus illum fugit recusandae nostrum quia nesciunt, fugiat eveniet porro excepturi quam cupiditate nulla. 9',
    comment: 'comment 9',
    storyPoint: 6,
    priority: { id: 3, name: 'Low' },
    status: { id: 3, name: 'Done' },
    tag: { id: 1, name: '#portfolio' },
    epicLink: { id: 1, name: 'service Admin' },
    owner: { id: 2, name: 'abdou' },
    responsible: null,
    createdOn: '2023-07-26T19:41:21.041Z',
    updatedOn: '2023-07-26T19:41:21.041Z'
  },
  {
    id: 10,
    project: { id: 3, name: 'MOBILE APP' },
    type: { id: 2, name: 'Bug' },
    title: 'todo 10',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae accusantium rem architecto deleniti, quaerat, repellendus quae delectus illum fugit recusandae nostrum quia nesciunt, fugiat eveniet porro excepturi quam cupiditate nulla. 10',
    comment: 'comment 10',
    storyPoint: 7,
    priority: { id: 1, name: 'Medium' },
    status: { id: 1, name: 'To Do' },
    tag: { id: 2, name: '#mobile' },
    epicLink: { id: 2, name: 'client Module' },
    owner: { id: 3, name: 'mohamed' },
    responsible: { id: 4, name: 'ayesha' },
    createdOn: '2023-07-27T20:41:21.041Z',
    updatedOn: '2023-07-27T20:41:21.041Z'
  },
  {
    id: 11,
    project: { id: 2, name: 'DASHBOARD APPS' },
    type: { id: 3, name: 'Task' },
    title: 'todo 11',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae accusantium rem architecto deleniti, quaerat, repellendus quae delectus illum fugit recusandae nostrum quia nesciunt, fugiat eveniet porro excepturi quam cupiditate nulla. 11',
    comment: 'comment 11',
    storyPoint: 8,
    priority: { id: 2, name: 'High' },
    status: { id: 2, name: 'In Progress' },
    tag: { id: 1, name: '#portfolio' },
    epicLink: { id: 1, name: 'service Admin' },
    owner: { id: 2, name: 'abdou' },
    responsible: null,
    createdOn: '2023-07-28T21:41:21.041Z',
    updatedOn: '2023-07-28T21:41:21.041Z'
  },
  {
    id: 12,
    project: { id: 1, name: 'PORTAIL PORTFOLIO' },
    type: { id: 2, name: 'Bug' },
    title: 'todo 12',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae accusantium rem architecto deleniti, quaerat, repellendus quae delectus illum fugit recusandae nostrum quia nesciunt, fugiat eveniet porro excepturi quam cupiditate nulla. 12',
    comment: 'comment 12',
    storyPoint: 4,
    priority: { id: 3, name: 'Low' },
    status: { id: 1, name: 'To Do' },
    tag: { id: 3, name: '#web' },
    epicLink: { id: 3, name: 'web Module' },
    owner: { id: 5, name: 'fatima' },
    responsible: { id: 6, name: 'khalid' },
    createdOn: '2023-07-29T22:41:21.041Z',
    updatedOn: '2023-07-29T22:41:21.041Z'
  },
  {
    id: 13,
    project: { id: 2, name: 'DASHBOARD APPS' },
    type: { id: 1, name: 'Story' },
    title: 'todo 13',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae accusantium rem architecto deleniti, quaerat, repellendus quae delectus illum fugit recusandae nostrum quia nesciunt, fugiat eveniet porro excepturi quam cupiditate nulla. 13',
    comment: 'comment 13',
    storyPoint: 2,
    priority: { id: 2, name: 'High' },
    status: { id: 3, name: 'Done' },
    tag: { id: 1, name: '#portfolio' },
    epicLink: { id: 1, name: 'service Admin' },
    owner: { id: 2, name: 'abdou' },
    responsible: null,
    createdOn: '2023-07-30T23:41:21.041Z',
    updatedOn: '2023-07-30T23:41:21.041Z'
  },
  {
    id: 14,
    project: { id: 3, name: 'MOBILE APP' },
    type: { id: 2, name: 'Bug' },
    title: 'todo 14',
    description: 'description 14',
    comment: 'comment 14',
    storyPoint: 3,
    priority: { id: 1, name: 'Medium' },
    status: { id: 1, name: 'To Do' },
    tag: { id: 2, name: '#mobile' },
    epicLink: { id: 2, name: 'client Module' },
    owner: { id: 3, name: 'mohamed' },
    responsible: { id: 4, name: 'ayesha' },
    createdOn: '2023-08-01T00:41:21.041Z',
    updatedOn: '2023-08-01T00:41:21.041Z'
  },
  {
    id: 15,
    project: { id: 2, name: 'DASHBOARD APPS' },
    type: { id: 3, name: 'Task' },
    title: 'todo 15',
    description: 'description 15',
    comment: 'comment 15',
    storyPoint: 5,
    priority: { id: 2, name: 'High' },
    status: { id: 2, name: 'In Progress' },
    tag: { id: 1, name: '#portfolio' },
    epicLink: { id: 1, name: 'service Admin' },
    owner: { id: 2, name: 'abdou' },
    responsible: null,
    createdOn: '2023-08-02T01:41:21.041Z',
    updatedOn: '2023-08-02T01:41:21.041Z'
  },
  {
    id: 16,
    project: { id: 4, name: 'WEB PLATFORM' },
    type: { id: 2, name: 'Bug' },
    title: 'todo 16',
    description: 'description 16',
    comment: 'comment 16',
    storyPoint: 4,
    priority: { id: 3, name: 'Low' },
    status: { id: 1, name: 'To Do' },
    tag: { id: 3, name: '#web' },
    epicLink: { id: 3, name: 'web Module' },
    owner: { id: 5, name: 'fatima' },
    responsible: { id: 6, name: 'khalid' },
    createdOn: '2023-08-03T02:41:21.041Z',
    updatedOn: '2023-08-03T02:41:21.041Z'
  },
  {
    id: 17,
    project: { id: 2, name: 'DASHBOARD APPS' },
    type: { id: 1, name: 'Story' },
    title: 'todo 17',
    description: 'description 17',
    comment: 'comment 17',
    storyPoint: 6,
    priority: { id: 2, name: 'High' },
    status: { id: 3, name: 'Done' },
    tag: { id: 1, name: '#portfolio' },
    epicLink: { id: 1, name: 'service Admin' },
    owner: { id: 2, name: 'abdou' },
    responsible: null,
    createdOn: '2023-08-04T03:41:21.041Z',
    updatedOn: '2023-08-04T03:41:21.041Z'
  },
  {
    id: 18,
    project: { id: 3, name: 'MOBILE APP' },
    type: { id: 2, name: 'Bug' },
    title: 'todo 18',
    description: 'description 18',
    comment: 'comment 18',
    storyPoint: 7,
    priority: { id: 1, name: 'Medium' },
    status: { id: 1, name: 'To Do' },
    tag: { id: 2, name: '#mobile' },
    epicLink: { id: 2, name: 'client Module' },
    owner: { id: 3, name: 'mohamed' },
    responsible: { id: 4, name: 'ayesha' },
    createdOn: '2023-08-05T04:41:21.041Z',
    updatedOn: '2023-08-05T04:41:21.041Z'
  },
  {
    id: 19,
    project: { id: 2, name: 'DASHBOARD APPS' },
    type: { id: 3, name: 'Task' },
    title: 'todo 19',
    description: 'description 19',
    comment: 'comment 19',
    storyPoint: 8,
    priority: { id: 2, name: 'High' },
    status: { id: 2, name: 'In Progress' },
    tag: { id: 1, name: '#portfolio' },
    epicLink: { id: 1, name: 'service Admin' },
    owner: { id: 2, name: 'abdou' },
    responsible: null,
    createdOn: '2023-08-06T05:41:21.041Z',
    updatedOn: '2023-08-06T05:41:21.041Z'
  },
  {
    id: 20,
    project: { id: 4, name: 'WEB PLATFORM' },
    type: { id: 2, name: 'Bug' },
    title: 'todo 20',
    description: 'description 20',
    comment: 'comment 20',
    storyPoint: 4,
    priority: { id: 3, name: 'Low' },
    status: { id: 1, name: 'To Do' },
    tag: { id: 3, name: '#web' },
    epicLink: { id: 3, name: 'web Module' },
    owner: { id: 5, name: 'fatima' },
    responsible: { id: 6, name: 'khalid' },
    createdOn: '2023-08-07T06:41:21.041Z',
    updatedOn: '2023-08-07T06:41:21.041Z'
  }
];
  
export  const tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description for task 1',
      comment: 'Comment for task 1',
      storyPoint: 3,
      priority: { id: 1, name: 'High' },
      status: { id: 1, name: 'To Do' },
      owner: { id: 1, name: 'Alice' },
      responsible: null,
      createdOn: '2023-01-01T10:00:00Z',
      updatedOn: '2023-01-02T10:00:00Z'
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description for task 2',
      comment: 'Comment for task 2',
      storyPoint: 5,
      priority: { id: 2, name: 'Medium' },
      status: { id: 2, name: 'In Progress' },
      owner: { id: 2, name: 'Bob' },
      responsible: null,
      createdOn: '2023-01-02T10:00:00Z',
      updatedOn: '2023-01-03T10:00:00Z'
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description for task 3',
      comment: 'Comment for task 3',
      storyPoint: 8,
      priority: { id: 3, name: 'Low' },
      status: { id: 3, name: 'Done' },
      owner: { id: 3, name: 'Charlie' },
      responsible: null,
      createdOn: '2023-01-03T10:00:00Z',
      updatedOn: '2023-01-04T10:00:00Z'
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Description for task 4',
      comment: 'Comment for task 4',
      storyPoint: 2,
      priority: { id: 1, name: 'High' },
      status: { id: 1, name: 'To Do' },
      owner: { id: 4, name: 'David' },
      responsible: null,
      createdOn: '2023-01-04T10:00:00Z',
      updatedOn: '2023-01-05T10:00:00Z'
    },
    {
      id: 5,
      title: 'Task 5',
      description: 'Description for task 5',
      comment: 'Comment for task 5',
      storyPoint: 3,
      priority: { id: 2, name: 'Medium' },
      status: { id: 2, name: 'In Progress' },
      owner: { id: 5, name: 'Eve' },
      responsible: null,
      createdOn: '2023-01-05T10:00:00Z',
      updatedOn: '2023-01-06T10:00:00Z'
    },
    {
      id: 6,
      title: 'Task 6',
      description: 'Description for task 6',
      comment: 'Comment for task 6',
      storyPoint: 4,
      priority: { id: 3, name: 'Low' },
      status: { id: 3, name: 'Done' },
      owner: { id: 1, name: 'Alice' },
      responsible: null,
      createdOn: '2023-01-06T10:00:00Z',
      updatedOn: '2023-01-07T10:00:00Z'
    },
    {
      id: 7,
      title: 'Task 7',
      description: 'Description for task 7',
      comment: 'Comment for task 7',
      storyPoint: 1,
      priority: { id: 1, name: 'High' },
      status: { id: 1, name: 'To Do' },
      owner: { id: 2, name: 'Bob' },
      responsible: null,
      createdOn: '2023-01-07T10:00:00Z',
      updatedOn: '2023-01-08T10:00:00Z'
    },
    {
      id: 8,
      title: 'Task 8',
      description: 'Description for task 8',
      comment: 'Comment for task 8',
      storyPoint: 2,
      priority: { id: 2, name: 'Medium' },
      status: { id: 2, name: 'In Progress' },
      owner: { id: 3, name: 'Charlie' },
      responsible: null,
      createdOn: '2023-01-08T10:00:00Z',
      updatedOn: '2023-01-09T10:00:00Z'
    },
    {
      id: 9,
      title: 'Task 9',
      description: 'Description for task 9',
      comment: 'Comment for task 9',
      storyPoint: 5,
      priority: { id: 3, name: 'Low' },
      status: { id: 3, name: 'Done' },
      owner: { id: 4, name: 'David' },
      responsible: null,
      createdOn: '2023-01-09T10:00:00Z',
      updatedOn: '2023-01-10T10:00:00Z'
    },
    {
      id: 10,
      title: 'Task 10',
      description: 'Description for task 10',
      comment: 'Comment for task 10',
      storyPoint: 3,
      priority: { id: 1, name: 'High' },
      status: { id: 1, name: 'To Do' },
      owner: { id: 5, name: 'Eve' },
      responsible: null,
      createdOn: '2023-01-10T10:00:00Z',
      updatedOn: '2023-01-11T10:00:00Z'
    },
    {
      id: 11,
      title: 'Task 11',
      description: 'Description for task 11',
      comment: 'Comment for task 11',
      storyPoint: 6,
      priority: { id: 2, name: 'Medium' },
      status: { id: 2, name: 'In Progress' },
      owner: { id: 1, name: 'Alice' },
      responsible: null,
      createdOn: '2023-01-11T10:00:00Z',
      updatedOn: '2023-01-12T10:00:00Z'
    },
    {
      id: 12,
      title: 'Task 12',
      description: 'Description for task 12',
      comment: 'Comment for task 12',
      storyPoint: 2,
      priority: { id: 3, name: 'Low' },
      status: { id: 3, name: 'Done' },
      owner: { id: 2, name: 'Bob' },
      responsible: null,
      createdOn: '2023-01-12T10:00:00Z',
      updatedOn: '2023-01-13T10:00:00Z'
    },
    {
      id: 13,
      title: 'Task 13',
      description: 'Description for task 13',
      comment: 'Comment for task 13',
      storyPoint: 7,
      priority: { id: 1, name: 'High' },
      status: { id: 1, name: 'To Do' },
      owner: { id: 3, name: 'Charlie' },
      responsible: null,
      createdOn: '2023-01-13T10:00:00Z',
      updatedOn: '2023-01-14T10:00:00Z'
    },
    {
      id: 14,
      title: 'Task 14',
      description: 'Description for task 14',
      comment: 'Comment for task 14',
      storyPoint: 4,
      priority: { id: 2, name: 'Medium' },
      status: { id: 2, name: 'In Progress' },
      owner: { id: 4, name: 'David' },
      responsible: null,
      createdOn: '2023-01-14T10:00:00Z',
      updatedOn: '2023-01-15T10:00:00Z'
    },
    {
      id: 15,
      title: 'Task 15',
      description: 'Description for task 15',
      comment: 'Comment for task 15',
      storyPoint: 3,
      priority: { id: 3, name: 'Low' },
      status: { id: 3, name: 'Done' },
      owner: { id: 5, name: 'Eve' },
      responsible: null,
      createdOn: '2023-01-15T10:00:00Z',
      updatedOn: '2023-01-16T10:00:00Z'
    },
    {
      id: 16,
      title: 'Task 16',
      description: 'Description for task 16',
      comment: 'Comment for task 16',
      storyPoint: 5,
      priority: { id: 1, name: 'High' },
      status: { id: 1, name: 'To Do' },
      owner: { id: 1, name: 'Alice' },
      responsible: null,
      createdOn: '2023-01-16T10:00:00Z',
      updatedOn: '2023-01-17T10:00:00Z'
    },
    {
      id: 17,
      title: 'Task 17',
      description: 'Description for task 17',
      comment: 'Comment for task 17',
      storyPoint: 6,
      priority: { id: 2, name: 'Medium' },
      status: { id: 2, name: 'In Progress' },
      owner: { id: 2, name: 'Bob' },
      responsible: null,
      createdOn: '2023-01-17T10:00:00Z',
      updatedOn: '2023-01-18T10:00:00Z'
    },
    {
      id: 18,
      title: 'Task 18',
      description: 'Description for task 18',
      comment: 'Comment for task 18',
      storyPoint: 4,
      priority: { id: 3, name: 'Low' },
      status: { id: 3, name: 'Done' },
      owner: { id: 3, name: 'Charlie' },
      responsible: null,
      createdOn: '2023-01-18T10:00:00Z',
      updatedOn: '2023-01-19T10:00:00Z'
    },
    {
      id: 19,
      title: 'Task 19',
      description: 'Description for task 19',
      comment: 'Comment for task 19',
      storyPoint: 3,
      priority: { id: 1, name: 'High' },
      status: { id: 1, name: 'To Do' },
      owner: { id: 4, name: 'David' },
      responsible: null,
      createdOn: '2023-01-19T10:00:00Z',
      updatedOn: '2023-01-20T10:00:00Z'
    },
    {
      id: 20,
      title: 'Task 20',
      description: 'Description for task 20',
      comment: 'Comment for task 20',
      storyPoint: 2,
      priority: { id: 2, name: 'Medium' },
      status: { id: 2, name: 'In Progress' },
      owner: { id: 5, name: 'Eve' },
      responsible: null,
      createdOn: '2023-01-20T10:00:00Z',
      updatedOn: '2023-01-21T10:00:00Z'
    }
  ];
  
export const projects: Project[] = [
  {
    id: 1,
    name: "PORTAIL PORTFOLIO"
  },
  {
    id: 2,
    name: "DASHBOARD APPS"
  },
  {
    id:3,
    name: "MOBILE APP"
  },
  {
    id:4,
    name: "WEB PLATFORM"
  }
];

export const typeItem: Type[] = [
  {
    id: 1,
    name: "Story"
  },
  {
    id: 2,
    name: "Bug"
  },
  {
    id: 3,
    name: "Technical story"
  }    
];

export const status: Status[] = [
  {
    id: 1,
    name: "Backlog"
  },
  {
    id: 2,
    name: "In Progress"
  },
  {
    id: 3,
    name: "Done"
  },
  {
    id: 4,
    name: "To Test"
    },
  {
    id: 5,
    name: "Blocked"
  }
];

export const priority: Priority[] = [
  {
    id: 1,
    name: "Blocking"
  },
  {
    id: 2,
    name: "High"
  },
  {
    id: 3,
    name: "Low"
  },
  {
    id: 4,
    name: "Very Low"
  }
];

export const tag: Tag[] = [
  {
    id: 1,
    name: "#portfolio"
  },
  {
    id: 2,
    name: "#dashboard"
  }
];

export const epic: EpicLink[] = [
  {
    id: 1,
    name: "service Admin"
  },
  {
    id: 2,
    name: "service sale"
  },
  {
    id: 3,
    name: "service delivery"
  }
];

export const user: Owner[] = [
  {
    id: 1,
    name: "Name 1"
  },
  {
    id: 2,
    name: "Name 2"
  },
  {
    id: 3,
    name: "Name 3"
  },
  {
    id: 4,
    name: "Name 4"
  }
];