import User, { IUser } from '../models/User.js';
import { AuthenticationError } from 'apollo-server-express';
import { signToken } from '../utils/auth';
import { BookInput } from '../types/book';
import { GraphQLContext } from '../types/context';


const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: GraphQLContext) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  
  },
  Mutation: {
    createMatchup: async (_parent: any, args: any): Promise<IMatchup | null> => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createVote: async (_parent: any, { _id, techNum }: { _id: string, techNum: number}): Promise<IMatchup | null> => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
  },
};

export default resolvers;
