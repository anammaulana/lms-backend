
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Buat user admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            username: 'admin',
            email: 'admin@example.com',
            password: adminPassword,
            name: 'Admin User',
            role: 'ADMIN',
            instructorTitle: 'Lead Instructor',
        },
    });

    // Buat beberapa tag
    const tags = ['react', 'frontend', 'javascript'];
    const tagRecords = await Promise.all(
        tags.map((name) =>
            prisma.tag.upsert({
                where: { name },
                update: {},
                create: { name },
            }),
        )
    );

    // Buat course sample
    const course = await prisma.course.upsert({
        where: { slug: 'react-for-beginners' },
        update: {},
        create: {
            title: 'React for Beginners',
            slug: 'react-for-beginners',
            description: 'Learn the basics of React from scratch.',
            price: 199000,
            rating: 4.5,
            isNew: true,
            instructorId: admin.id,
            published: true,
            level: 'Beginner',
            category: 'Frontend',
            lessonsCount: 10,
            totalDurationHours: 5,
        },
    });

    // Hubungkan course dan tags (CourseTag)
    await Promise.all(
        tagRecords.map((tag) =>
            prisma.courseTag.upsert({
                where: {
                    courseId_tagId: {
                        courseId: course.id,
                        tagId: tag.id,
                    },
                },
                update: {},
                create: {
                    courseId: course.id,
                    tagId: tag.id,
                },
            }),
        )
    );

    console.log('✅ Seeding completed.');
}

main()
    .catch((e) => {
        console.error('❌ Seeding error:', e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
