const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID } = graphql;

const usersData = [
  { id: '1', name: 'Bond', age: 100, profession: 'Programmer' },
  { id: '2', name: 'a', age: 1, profession: 'Chef' },
  { id: '3', name: 'b', age: 2, profession: 'Scientist' },
  { id: '4', name: 'c', age: 3, profession: 'Homey' },
  { id: '5', name: 'd', age: 4, profession: 'IDK' },
];

const hobbiesData = [
  {
    id: '1',
    title: 'Programming',
    description: 'Lorem, ipsum dolor sit ',
    userId: '1',
  },
  { id: '2', title: 'Cooking', description: 'Lorem ipsum dolor sit amet.', userId: '1' },
  { id: '3', title: 'Singing', description: 'Lorem ipsum dolor sit amet.', userId: '1' },
  {
    id: '4',
    title: 'Dancing',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    userId: '3',
  },
  { id: '5', title: 'Sleeping', description: 'Lorem, ipsum dolor.', userId: '1' },
];

const postsData = [
  {
    id: '1',

    comment:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus, neque quasi. Praesentium, dolorum sapiente! Dolor voluptas ipsum aperiam dolores eos eligendi adipisci harum tempore necessitatibus, dignissimos, voluptatem nesciunt laborum esse?',
    userId: '1',
  },
  { id: '2', comment: 'Lorem ipsum dolor sit amet.', userId: '1' },
  { id: '3', comment: 'Lorem ipsum dolor sit amet.', userId: '1' },
  { id: '4', comment: 'Lorem ipsum dolor sit amet consectetur.', userId: '2' },
  { id: '5', comment: 'Lorem, ipsum dolor.', userId: '3' },
];

// Create Types
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user...',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'Hobby Description',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return usersData.filter((u) => u.id === parent.userId)[0];
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post Description',
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return usersData.filter((u) => u.id === parent.userId)[0];
      },
    },
  }),
});

// Root Query

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Description',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // we get resolve with data
        // get and return data from a data source
        return _.find(usersData, { id: args.id });
      },
    },
    hobby: {
      type: HobbyType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        // return data for our hobby
        return _.find(hobbiesData, { id: args.id });
      },
    },
    post: {
      type: PostType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        // return data for our post
        return _.find(postsData, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
