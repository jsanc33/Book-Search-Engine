import User from "../models/User.js";
import { signToken, AuthenticationError } from "../services/auth.js";
import { BookInput } from "../types/booktypes.js";
import { GraphQLContext } from "../types/contexttypes.js";

interface AddUserArgs {
  username: string;
  email: string;
  password: string;
}

interface LoginArgs {
  email: string;
  password: string;
}

interface RemoveBookArgs {
  bookId: string;
}

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
      { email, password }: AddUserArgs
    ) => {
      const user = await User.create({email, password });
      const token = signToken(user.email, user._id);
      return { token, user };
    },

    login: async (_parent: any, { email, password }: LoginArgs) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user.email, user._id);
      return { token, user };
    },

    addBook: async (_parent: any, args: BookInput, context: GraphQLContext) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user._id,
          {
            $addToSet: { savedBooks: args },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeBook: async (
      _parent: any,
      { bookId }: RemoveBookArgs,
      context: GraphQLContext
    ) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user._id,
          {
            $pull: { savedBooks: { bookId } },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

export default resolvers;
