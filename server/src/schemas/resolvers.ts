import User, { IUser } from "../models/User.js";
import { AuthenticationError } from "apollo-server-express";
import { signToken } from "../utils/auth";
import { BookInput } from "../types/book";
import { GraphQLContext } from "../types/context";

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: GraphQLContext) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    addUser: async (
      _parent: any,
      { username, email, password }: AddUserArgs
    ) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    createVote: async (
      _parent: any,
      { _id, techNum }: { _id: string; techNum: number }
    ): Promise<IMatchup | null> => {
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
