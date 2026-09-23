import prisma from "../lib/prisma.js";

export async function getUsers(req, res) {
    try {
        const usuarios = await prisma.users.findMany();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar usuários!",
            error: error.message,
        });
    }
}

export async function createUser(req, res) {
    try {
        const { name, email } = req.body;

        const usuario = await prisma.users.create({
            data: {
                name,
                email,
            },
        });

        return res.status(201).json({
            usuario
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao criar usuário!",
            error: error.message,
        });
    }
}

export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const usuario = await prisma.users.update({
            where: {
                id,
            },
            data: {
                name: name ?? null,
                email: email ?? null,
            },
        });

        return res.status(200).json({
            usuario
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar usuário!",
            error: error.message,
        });
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        const usuario = await prisma.users.delete({
            where: {
                id,
            },
        });

        return res.status(200).json({
            usuario
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao deletar usuário!",
            error: error.message,
        });
    }
}

export async function getUser(req, res) {
    try {
        const { id } = req.params;

        const usuario = await prisma.users.findUnique({
            where: {
                id,
            },
        });

        return res.status(200).json({
            usuario
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao recuperar usuário!",
            error: error.message,
        });
    }
}