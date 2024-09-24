/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import prisma from "@/db";
import bcrypt from 'bcrypt';

export async function createInitialDataForUser(userId: number) {
  try {
    // Create initial labels
    const labels = await prisma.label.createMany({
      data: [
        { name: 'Inbox', userId: userId },
        { name: 'Personal', userId: userId },
        { name: 'Work', userId: userId },
      ],
    });

    // Fetch the created labels to get their IDs
    const createdLabels = await prisma.label.findMany({
      where: { userId: userId },
    });

    // Create sample todos for each label
    const todos = await prisma.todo.createMany({
      data: [
        { title: 'Welcome to your Inbox!', labelId: createdLabels.find(label => label.name === 'Inbox').id, userId: userId },
        { title: 'Plan your Personal tasks here', labelId: createdLabels.find(label => label.name === 'Personal').id, userId: userId },
        { title: 'Organize your Work tasks', labelId: createdLabels.find(label => label.name === 'Work').id, userId: userId },
      ],
    });

  } catch (error) {
    console.error('Error creating initial data:', error);
  }
}

export async function signupUser(email: string, password: string, name: string) {
  try {
    const hash = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        email,
        password: hash,
        name,
      },
    });
    // Create initial data for the new user
    await createInitialDataForUser(user.id);

    return {
      id: user.id,
      name: user.name,
      email: user.id,
      profileImage: user.profileImage,
    }

  } catch (error) {
    console.error('Error signing up user:', error);
    return null;
  }
}

export async function hashPassword(password: string) {
  const saltRounds = 10; // You can adjust the number of salt rounds as needed
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}


export async function verifyPassword(plainPassword: string, hashedPassword: string) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}