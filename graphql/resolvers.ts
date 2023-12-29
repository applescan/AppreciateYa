import { Context } from "../pages/api/graphql";
import * as bcrypt from "bcrypt";
import { endOfMonth, endOfQuarter, endOfYear, startOfMonth, startOfQuarter, startOfYear, } from 'date-fns';

export const resolvers = {
    Query: {
        user: async (_: any, args: { id: number }, context: Context) => {
            return await context.prisma.user.findUnique({
                where: { id: args.id }
            });
        },
        users: async (_: any, args: { orderBy?: { createdAt?: 'asc' | 'desc' } }, context: Context) => {
            return await context.prisma.user.findMany({
                orderBy: args.orderBy
            });
        },
        posts: async (_: any, __: any, context: Context) => {
            return await context.prisma.post.findMany({
                orderBy: {
                    updatedAt: 'desc'
                }
            });
        },
        postsByOrganizationId: async (_: any, args: { orgId: number, filter: { type: 'MONTH' | 'QUARTER' | 'YEAR' } }, context: Context) => {
            let dateFilterStart, dateFilterEnd;
            const now = new Date();

            switch (args.filter.type) {
                case 'MONTH':
                    dateFilterStart = startOfMonth(now);
                    dateFilterEnd = endOfMonth(now);
                    break;
                case 'QUARTER':
                    dateFilterStart = startOfQuarter(now);
                    dateFilterEnd = endOfQuarter(now);
                    break;
                case 'YEAR':
                    dateFilterStart = startOfYear(now);
                    dateFilterEnd = endOfYear(now);
                    break;
                default:
                    throw new Error(`Invalid filter type: ${args.filter}`);
            }

            if (!dateFilterStart || !dateFilterEnd) {
                throw new Error("Date filters could not be determined");
            }

            return await context.prisma.post.findMany({
                where: {
                    orgId: args.orgId,
                    updatedAt: {
                        gte: dateFilterStart.toISOString(),
                        lte: dateFilterEnd.toISOString(),
                    },
                },
                orderBy: {
                    updatedAt: 'desc',
                },
            });
        },

        postsBySpecificRecipient: async (_: any, args: { orgId: number, recipientId: number, filter: { type: 'MONTH' | 'QUARTER' | 'YEAR' } }, context: Context) => {
            let dateFilterStart, dateFilterEnd;
            const now = new Date();

            switch (args.filter.type) {
                case 'MONTH':
                    dateFilterStart = startOfMonth(now);
                    dateFilterEnd = endOfMonth(now);
                    break;
                case 'QUARTER':
                    dateFilterStart = startOfQuarter(now);
                    dateFilterEnd = endOfQuarter(now);
                    break;
                case 'YEAR':
                    dateFilterStart = startOfYear(now);
                    dateFilterEnd = endOfYear(now);
                    break;
                default:
                    throw new Error(`Invalid filter type: ${args.filter}`);
            }

            return await context.prisma.post.findMany({
                where: {
                    orgId: args.orgId,
                    recipientId: args.recipientId,
                    updatedAt: {
                        gte: dateFilterStart.toISOString(),
                        lte: dateFilterEnd.toISOString(),
                    },
                },
                orderBy: {
                    updatedAt: 'desc',
                },
            });
        },
        postsBySpecificSender: async (_: any, args: { orgId: number, authorId: number, filter: { type: 'MONTH' | 'QUARTER' | 'YEAR' } }, context: Context) => {
            let dateFilterStart, dateFilterEnd;
            const now = new Date();

            switch (args.filter.type) {
                case 'MONTH':
                    dateFilterStart = startOfMonth(now);
                    dateFilterEnd = endOfMonth(now);
                    break;
                case 'QUARTER':
                    dateFilterStart = startOfQuarter(now);
                    dateFilterEnd = endOfQuarter(now);
                    break;
                case 'YEAR':
                    dateFilterStart = startOfYear(now);
                    dateFilterEnd = endOfYear(now);
                    break;
                default:
                    throw new Error(`Invalid filter type: ${args.filter}`);
            }

            return await context.prisma.post.findMany({
                where: {
                    orgId: args.orgId,
                    authorId: args.authorId,
                    updatedAt: {
                        gte: dateFilterStart.toISOString(),
                        lte: dateFilterEnd.toISOString(),
                    },
                },
                orderBy: {
                    updatedAt: 'desc',
                },
            });
        },
        organizations: async (_: any, __: any, context: Context) => {
            return await context.prisma.organization.findMany();
        },
        organization: async (_: any, args: any, context: Context) => {
            return await context.prisma.organization.findUnique({ where: { id: Number(args.where.id) } });
        },
        usersByOrganizationId: async (_: any, args: { orgId: number }, context: Context) => {
            return await context.prisma.user.findMany({
                where: { orgId: args.orgId }
            });
        },
    },
    Mutation: {
        createUser: async (_: any, args: any, context: Context) => {
            const { email, password, name, role, orgId, image } = args;
            const hashedPassword = await bcrypt.hash(password, 10);
            return await context.prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    role,
                    orgId: Number(orgId),
                    image,
                },
            });
        },
        editUser: async (_: any, args: any, context: Context) => {
            const { id, name, email, role, orgId, image, password } = args;

            // Conditionally hash the password if it's provided
            let hashedPassword;
            if (password) {
                hashedPassword = await bcrypt.hash(password, 10);
            }

            return await context.prisma.user.update({
                where: { id },
                data: {
                    name,
                    email,
                    role,
                    orgId: Number(orgId),
                    image,
                    // Conditionally add the password field if a new one is provided
                    ...(hashedPassword && { password: hashedPassword })
                }
            });
        },
        deleteUser: async (_: any, args: any, context: Context) => {
            const { id } = args;
            return await context.prisma.user.delete({ where: { id } });
        },
        createPost: async (_: any, args: any, context: Context) => {
            const { content, authorId, recipientId, orgId } = args;
            return await context.prisma.post.create({
                data: {
                    content,
                    authorId: Number(authorId),
                    recipientId: Number(recipientId),
                    orgId: Number(orgId),
                },
            });
        },
        updatePost: async (_: any, args: any, context: Context) => {
            const { id, content, recipientId } = args;
            return await context.prisma.post.update({
                where: { id },
                data: { content, recipientId: Number(recipientId) },
            });
        },
        deletePost: async (_: any, args: any, context: Context) => {
            const { id } = args;
            return await context.prisma.post.delete({ where: { id } });
        },
        createOrganization: async (_: any, args: any, context: Context) => {
            const { name, address, country, organizationType } = args.data;

            return await context.prisma.organization.create({
                data: {
                    name,
                    address,
                    country,
                    organizationType
                }
            });
        },
        editOrganization: async (_: any, args: any, context: Context) => {
            const { id, name, address, country, organizationType } = args.data;

            return await context.prisma.organization.update({
                where: { id: Number(id) },
                data: {
                    name,
                    address,
                    country,
                    organizationType
                },
            });
        },
        verifyCurrentPassword: async (_: any, args: { userId: number, password: string }, context: Context) => {
            const user = await context.prisma.user.findUnique({
                where: { id: args.userId }
            });

            if (!user) {
                throw new Error("User not found");
            }

            const validPassword = await bcrypt.compare(args.password, user.password);

            if (!validPassword) {
                throw new Error("Incorrect password");
            }

            return true;
        },
    },

    User: {
        authoredPosts: async (parent: any, _: any, context: Context) => {
            return await context.prisma.post.findMany({ where: { authorId: parent.id } });
        },
        receivedPosts: async (parent: any, _: any, context: Context) => {
            return await context.prisma.post.findMany({ where: { recipientId: parent.id } });
        },
        organization: async (parent: any, _: any, context: Context) => {
            return await context.prisma.organization.findUnique({ where: { id: parent.orgId } });
        },
    },

    Post: {
        author: async (parent: any, _: any, context: Context) => {
            return await context.prisma.user.findUnique({ where: { id: parent.authorId } });
        },
        organization: async (parent: any, _: any, context: Context) => {
            return await context.prisma.organization.findUnique({ where: { id: parent.orgId } });
        },
        recipient: async (parent: any, _: any, context: Context) => {
            return await context.prisma.user.findUnique({ where: { id: parent.recipientId } });
        },
    },
    Organization: {
        users: async (parent: any, _: any, context: Context) => {
            return await context.prisma.user.findMany({
                where: {
                    orgId: parent.id,
                    role: 'USER'
                }
            });
        },
        admins: async (parent: any, _: any, context: Context) => {
            return await context.prisma.user.findMany({
                where: {
                    orgId: parent.id,
                    role: 'ADMIN'
                }
            });
        },
        posts: async (parent: any, _: any, context: Context) => {
            return await context.prisma.post.findMany({ where: { orgId: parent.id } });
        },
    },
};
