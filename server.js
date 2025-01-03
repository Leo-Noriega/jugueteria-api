import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './app/config/db.js';
import userRoutes from './app/routes/userRoutes.js';
import orderRoutes from './app/routes/orderRoutes.js';
import categoriesRoutes from './app/routes/categoryRoutes.js';
import productRoutes from './app/routes/productRoutes.js';
import paymentRoutes from './app/routes/paymentRoutes.js';
import cartProductRoutes from './app/routes/cartProductRoutes.js';
import cartRoutes from './app/routes/cartRoutes.js';
import './app/models/associations.js';
import Category from './app/models/Category.js';
import User from './app/models/User.js';
import Product from './app/models/Product.js';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import returnRoutes from './app/routes/returnRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.NODE_DOCKER_PORT;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use('/toystore', userRoutes);
app.use('/toystore', orderRoutes);
app.use('/toystore', categoriesRoutes);
app.use('/toystore', productRoutes);
app.use('/toystore', returnRoutes);
app.use('/toystore', paymentRoutes);
app.use('/toystore', cartProductRoutes);
app.use('/toystore', cartRoutes);

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
    const [category] = await Category.findOrCreate({ where: { name: categoryName } });
    console.log(`Categoría ${category.name} creada con id ${category.id}`);

    for (let i = 1; i <= 3; i++) {
      const productData = {
        name: `Producto ${i} ${categoryName}`,
        description: `Descripción del producto ${i} en la categoría ${categoryName}`,
        price: (i * 10) + 0.99, // Precio de ejemplo
        stock: 5,
        category_id: category.id
      };
      const product = await Product.create(productData);
      console.log(`Producto ${product.name} creado con id ${product.product_id} en la categoría ${category.name}`);
    }
  }

  const adminData = {
    name: "Administrador",
    last_name: "Toystore",
    email: "toystore@gmail.com",
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

  const countersalemanData = {
    name: "Fernanda",
    last_name: "Hernandez",
    email: "fer@gmail.com",
    password: await bcrypt.hash("fer2024", 10),
    role: "countersaleman",
    phone_number: "9876543210"
  };

  const [countersaleman, countersalemanCreated] = await User.findOrCreate({
    where: { email: countersalemanData.email },
    defaults: countersalemanData
  });

  if (countersalemanCreated) {
    console.log("Usuario countersaleman creado");
  } else {
    console.log("Usuario countersaleman ya existe");
  }

  const userData1 = {
    name: "Vulmaro",
    last_name: "Martinez",
    email: "vulmarotl20@gmail.com",
    password: await bcrypt.hash("12345678", 10),
    role: "user",
    phone_number: "123123123123"
  };
  
  const [user, uCreated] = await User.findOrCreate({
    where: { email: userData1.email },
    defaults: userData1
  });
  
  if (uCreated) {
    console.log("Usuario 1 creado");
  } else {
    console.log("Usuario 1 ya existe");
  }
  
  const userData2 = {
    name: "Anett",
    last_name: "Vera",
    email: "anettyomalivera@gmail.com",
    password: await bcrypt.hash("12345678", 10),
    role: "user",
    phone_number: "123123123123"
  };
  
  const [user2, uCreated2] = await User.findOrCreate({
    where: { email: userData2.email },
    defaults: userData2
  });
  
  if (uCreated2) {
    console.log("Usuario 2 creado");
  } else {
    console.log("Usuario 2 ya existe");
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
  console.log(`Server running on http://localhost:${process.env.NODE_LOCAL_PORT}`);
});

start();
