import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const propostas = await prisma.proposta.findMany({
      include: {
        cliente: true,
        carro: true,
      },
    });
    res.status(200).json(propostas);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const { clienteId, carroId, descricao } = req.body;

  if (!clienteId || !carroId || !descricao) {
    res.status(400).json({ erro: "infrome o clienteId, CarroId, descricao" });
    return;
  }

  try {
    const proposta = await prisma.proposta.create({
      data: { clienteId, carroId, descricao },
    });
    res.status(201).json(proposta);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const proposta = await prisma.proposta.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(proposta);
  } catch (error) {
    res.status(400).json(error);
  }
});

async function enviaEmail(
  nome: string,
  email: string,
  descricao: string,
  resposta: string
) {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "7d42fb001@smtp-brevo.com",
      pass: "pUkGQWbg5LCMyBFD",
    },
  });

  try {
    const info = await transporter.sendMail({
      from: "pedrohenriquedoamaralsiqueira@gmail.com",
      to: email,
      subject: "RE: Proposta Recenda Avenida",
      text: resposta,
      html: `<h2>Olá ${nome},</h2>
      <h3>Proposta: ${descricao}</h3>
      <h3>Resposta: ${resposta}</h3>
      <p>Atenciosamente, Avenida Veículos</p>`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
}

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { resposta } = req.body;

  const dado = await prisma.proposta.findUnique({
    where: { id: Number(id) },
    include: {
      cliente: true,
    },
  });

  if (!resposta) {
    res
      .status(400)
      .json({ erro: "Informe a resposta para a proposta do cliente" });
    return;
  }

  try {
    const proposta = await prisma.proposta.update({
      where: { id: Number(id) },
      data: { resposta },
    });

    enviaEmail(
      dado?.cliente.nome as string,
      dado?.cliente.email as string,
      dado?.descricao as string,
      resposta
    );
    res.status(200).json(proposta);
  } catch (error) {
    res.status(400).json(error);
  }
});
export default router;
