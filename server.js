import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import sequelize from './app/config/db.js'
import userRoutes from './app/routes/userRoutes.js'
import orderRoutes from './app/routes/orderRoutes.js'
import categoriesRoutes from './app/routes/categoryRoutes.js'
import productRoutes from './app/routes/productRoutes.js'
import './app/models/associations.js'
import Category from './app/models/Category.js'
import User from './app/models/User.js'
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()

const app = express()
const PORT = process.env.NODE_DOCKER_PORT

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())

app.use('/toystore', userRoutes)
app.use('/toystore', orderRoutes)
app.use('/toystore', categoriesRoutes)
app.use('/toystore', productRoutes)

// Crear el directorio 'uploads' si no existe
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Servir el directorio 'uploads' como archivos estáticos
app.use('/uploads', express.static(uploadDir));

const initializeData = async () => {
  const categories = ["Educativos", "Electrónicos", "Construcción", "De Mesa", "Peluches", "Exterior"];
  for (const categoryName of categories) {
    await Category.findOrCreate({ where: { name: categoryName } });
  }

  const adminData = {
    name: "Leonardo",
    last_name: "Noriega",
    email: "leonoriega100@gmail.com",
    password: await bcrypt.hash("Noriega0", 10),
    role: "ADMIN",
    phone_number: "123123123123"
  };

  const [admin, created] = await User.findOrCreate({
    where: { email: adminData.email },
    defaults: adminData
  });

  if (created) {
    console.log("Usuario administrador creado");
  } else {
    console.log("Usuario administrador ya existe");
  }
};

async function start() {
  try {
    await sequelize.sync({ force: true });
    console.log('Conexión a la base de datos establecida correctamente.');
    await initializeData();
  } catch (error) {
    console.error('Error al conectar a la base de datos', error);
  }
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${process.env.NODE_LOCAL_PORT}`)
})

start();
