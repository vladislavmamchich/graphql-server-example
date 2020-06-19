const { GraphQLScalarType } = require('graphql')
const { GraphQLError } = require('graphql/error')
const { Kind } = require('graphql/language')
const { EmailAddressResolver } = require('graphql-scalars')

const User = require('../db/models/User')

const USERS_SKIP_DEFAULT = 0
const USERS_LIMIT_DEFAULT = 10

const resolvers = {
	Email: EmailAddressResolver,
	Query: {
		user: async (parent, { id }) => User.findById(id),
		users: async (parent, { skip, limit }) =>
			User.find()
				.limit(limit || USERS_LIMIT_DEFAULT)
				.skip(skip || USERS_SKIP_DEFAULT),
	},
	Mutation: {
		createUser: (parent, { input: { name, email } }) =>
			User.create({
				name,
				email,
			}),
		updateUser: async (parent, { id, input: { name, email } }) =>
			User.findOneAndUpdate(
				{ _id: id },
				{
					$set: {
						name,
						email,
					},
				},
				{ new: true }
			),
		deleteUser: async (parent, { id }) =>
			User.findOneAndDelete({ _id: id }),
	},
}

module.exports = { resolvers }
