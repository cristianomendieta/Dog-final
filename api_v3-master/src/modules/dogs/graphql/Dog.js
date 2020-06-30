import { ObjectId } from 'mongodb';
import { pubsub } from '../../../app';
import { uploadS3 } from '../../../util';


const typeDefs = {
    Query: `
        dog: [Dog]
        dog_id(_id: String): Dog
    `,

    Mutation: `
        newDog(name: String!, birthday: String!, weight: Int!, breed: String!, gender: Int!, castrated: Int!, photo: Upload): Dog
        removeDog(_id: String!): Dog
        updateDog(_id: String!): Dog
    `,
    Type: `
        type Dog {
            _id: ID,
            name: String,
            id: String,
            birthday: String,
            weight: Int,
            breed: String,
            gender: Int,
            castrated: Int,
            photo: String,

        }

        enum TypeSubDog {
            newDog
            removeDog
            updateDog
          }
          
    `
}

const resolvers = {
    Dog: {
        id: async (parent, args, ctx, info) => {
            return parent._id;
        },
    },
    Query: {
        dog: async (parent, args, ctx, info) => {
            try {
                let result = await ctx.models.Dog.find({
                    
                });
                return result;
            } catch (error) {
                console.log(error)
            }
        },
        dog_id: async (parent, args, ctx, info) => {
            try {
                let result = await ctx.models.Dog.findById(args._id);
                return result;
            } catch (error) {
                console.log(error)
            }
        }
    },
    Mutation: {
        newDog: async (parent, args, ctx, info) => {
            try {
                const {photo, _id, ...rest} = args;
                const {filename} = await photo;
                if(_id){
                    const s3Result = await uploadS3({
                        bucket: 'uizzy-stuffs',
                        file: photo,
                        key: 'DOG_'+_id+'.'+filename.split('.')[1]
                    });

                   let result = await ctx.models.Dog.findOneAndUpdate({
                        _id: ObjectId(_id)
                    },
                    {       
                            photo: s3Result.Location,
                            ...rest
                    });
                    return result;
                } else {
                    const _id = ObjectId();
                    const s3Result = await uploadS3({
                        bucket: 'uizzy-stuffs',
                        file: photo,
                        key: 'DOG_'+_id+'.'+filename.split('.')[1]
                    });

                    let result = await ctx.models.Dog.create({
                        _id,
                        photo: s3Result.Location,
                        ...rest
                    });
                    return result;
                }
            } catch (error) {
                console.log(error)
            }
        },
        removeDog: async (parent, args, ctx, info) => {
            try {
                const { _id } = args;
                let result = await ctx.models.Dog.findOneAndUpdate(
                    {
                        _id
                    },
                    {
                        $set: {
                            status: false
                        }
                    },
                    {
                        new: true
                    }
                );
                return result;
            } catch (error) {
                console.log(error)
            }
        },
        updateDog: async (parent, args, ctx, info) => {
            try {
                const { _id } = args;
                let result = await ctx.models.Dog.findOneAndUpdate(
                    {
                        _id
                    },
                    {
                        $set: {
                            status: false
                        }
                    },
                    {
                        new: true
                    }
                );
                console.log(args);
                result = await ctx.models.Dog.create({
                    ...args
                });
                return result;
            } catch (error) {
                console.log(error)
            }
        },
    },
}

export default {
    resolvers,
    typeDefs
}