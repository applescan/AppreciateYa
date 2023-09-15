import { Context } from "../pages/api/graphql";
import * as bcrypt from "bcrypt";

export const resolvers = {
    Query: {
        users: async (_: any, args: { orderBy?: { createdAt?: 'asc' | 'desc' } }, context: Context) => {
            return await context.prisma.user.findMany({
                orderBy: args.orderBy
            });
        },
        posts: async (_: any, __: any, context: Context) => {
            return await context.prisma.post.findMany();
        },
        organizations: async (_: any, __: any, context: Context) => {
            return await context.prisma.organization.findMany();
        },
        organization: async (_: any, args: any, context: Context) => {
            return await context.prisma.organization.findUnique({ where: { id: Number(args.where.id) } });
        },
    },
    Mutation: {
        createUser: async (_: any, args: any, context: Context) => {
            const { email, password, name, role, orgId } = args;
            const hashedPassword = await bcrypt.hash(password, 10);
            return await context.prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    role,
                    orgId: Number(orgId),
                },
            });
        },
        editUser: async (_: any, args: any, context: Context) => {
            const { id, name, email, role, orgId } = args;
            return await context.prisma.user.update({
                where: { id },
                data: {
                    name,
                    email,
                    role,
                    orgId: Number(orgId)
                }
            });
        },
        deleteUser: async (_: any, args: any, context: Context) => {
            const { id } = args;
            return await context.prisma.user.delete({ where: { id } });
        },
        createPost: async (_: any, args: any, context: Context) => {
            const { content, authorId, orgId } = args;
            return await context.prisma.post.create({
                data: {
                    content,
                    authorId: Number(authorId),
                    orgId: Number(orgId),
                },
            });
        },
        updatePost: async (_: any, args: any, context: Context) => {
            const { id, content } = args;
            return await context.prisma.post.update({
                where: { id },
                data: { content },
            });
        },
        deletePost: async (_: any, args: any, context: Context) => {
            const { id } = args;
            return await context.prisma.post.delete({ where: { id } });
        },
        createOrganization: async (_: any, args: any, context: Context) => {
            const { name, address, country, organizationType, adminIds } = args.data;

            const newOrg = await context.prisma.organization.create({
                data: {
                    name,
                    address,
                    country,
                    organizationType
                },
                select: { id: true } // This ensures that only the ID is returned
            });

            // Update users with the role of ADMIN for the new organization
            await context.prisma.user.updateMany({
                where: {
                    id: { in: adminIds },
                },
                data: {
                    orgId: newOrg.id,
                    role: 'ADMIN'
                }
            });

            return newOrg;
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
    },

    User: {
        posts: async (parent: any, _: any, context: Context) => {
            return await context.prisma.post.findMany({ where: { authorId: parent.id } });
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
