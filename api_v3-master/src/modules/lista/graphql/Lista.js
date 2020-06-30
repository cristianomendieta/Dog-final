import { ObjectId } from 'mongodb';
import { pubsub } from '../../../app';


const typeDefs = {
  Query: `
  lista: [Lista]
    `,

  Mutation: `
        newLista(title: String!): Lista
    `,
  Type: `
        type Lista {
        _id: ID
        title: String
        }
        
    `
}

const resolvers = {
  Query: {
    lista: async (parent, args, ctx, info) => {
      try {
        let result = await ctx.models.Lista.find();
        return result;
      } catch (error) {
        console.log(error)
      }
    }
  },
  Mutation: {
    newLista: async (parent, args, ctx, info) => {
      try {
        let result = await ctx.models.Lista.create({
          title: args.title
        });
        return result;
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export default {
  resolvers,
  typeDefs
}