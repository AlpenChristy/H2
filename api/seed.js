const mongoose = require("mongoose");
const Counselor = require("./models/counselor");

mongoose.connect("mongodb+srv://alpenchristy:alpen@cluster0.weaco.mongodb.net/")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("DB connection error:", err));

const seedCounselors = [
    {
        name: "Dr. Sarah Johnson",
        specialization: "School Counseling",
        imageUrl: "https://api.a0.dev/assets/image?text=professional%20counselor%20woman%20smiling&seed=1",
        credentials: "Licensed Clinical Psychologist",
        specializations: ["School Counseling", "Anxiety", "Depression"],
        rating: 4.8,
        reviewCount: 127,
        bio: "With over 15 years of experience, I specialize in helping individuals navigate life transitions, relationship challenges, and personal growth."
    },
    {
        name: "Dr. Michael Chen",
        specialization: "Career Counseling",
        imageUrl: "https://api.a0.dev/assets/image?text=professional%20counselor%20man%20smiling&seed=2",
        credentials: "Career Development Specialist",
        specializations: ["Career Counseling", "Professional Development"],
        rating: 4.6,
        reviewCount: 98,
        bio: "Helping professionals find their path and achieve their career goals through evidence-based coaching and counseling."
    },
    {
        name: "Dr. Emily Williams",
        specialization: "Mental Health",
        imageUrl: "https://api.a0.dev/assets/image?text=professional%20therapist%20woman%20office&seed=3",
        credentials: "Mental Health Counselor",
        specializations: ["Mental Health", "Trauma", "PTSD"],
        rating: 4.9,
        reviewCount: 156,
        bio: "Specialized in trauma-informed care and mental health counseling with a focus on healing and personal growth."
    },
    {
        name: "Dr. James Wilson",
        specialization: "Family Therapy",
        imageUrl: "https://api.a0.dev/assets/image?text=professional%20counselor%20man%20office&seed=4",
        credentials: "Licensed Family Therapist",
        specializations: ["Family Therapy", "Relationships", "Couples"],
        rating: 4.7,
        reviewCount: 112,
        bio: "Dedicated to helping families and couples build stronger relationships through effective communication and understanding."
    },
    {
        name: "Dr. Olivia Martinez",
        specialization: "Child Psychology",
        imageUrl: "https://api.a0.dev/assets/image?text=professional%20child%20psychologist%20woman&seed=5",
        credentials: "Child Psychologist",
        specializations: ["Child Development", "Behavioral Therapy"],
        rating: 4.5,
        reviewCount: 89,
        bio: "Passionate about child development and behavioral therapy, helping children overcome challenges with a nurturing approach."
    },
    {
        name: "Dr. David Anderson",
        specialization: "Addiction Counseling",
        imageUrl: "https://api.a0.dev/assets/image?text=professional%20therapist%20man%20smiling&seed=6",
        credentials: "Certified Addiction Counselor",
        specializations: ["Substance Abuse", "Addiction Recovery"],
        rating: 4.8,
        reviewCount: 134,
        bio: "Dedicated to helping individuals overcome addiction and regain control of their lives through evidence-based counseling."
    },
    {
        name: "Dr. Sophia Patel",
        specialization: "Stress Management",
        imageUrl: "https://api.a0.dev/assets/image?text=stress%20management%20therapist%20woman&seed=7",
        credentials: "Wellness Coach",
        specializations: ["Stress Management", "Mindfulness"],
        rating: 4.6,
        reviewCount: 102,
        bio: "Using mindfulness and wellness techniques to help individuals manage stress and improve overall mental health."
    },
    {
        name: "Dr. Robert Lee",
        specialization: "Grief Counseling",
        imageUrl: "https://api.a0.dev/assets/image?text=grief%20counselor%20man%20office&seed=8",
        credentials: "Licensed Grief Counselor",
        specializations: ["Grief", "Loss", "Bereavement"],
        rating: 4.7,
        reviewCount: 119,
        bio: "Providing compassionate support to individuals coping with loss, helping them find healing and resilience."
    }
];

Counselor.insertMany(seedCounselors)
    .then(() => {
        console.log("Data seeded successfully");
        mongoose.connection.close();
    })
    .catch(err => console.log("Seeding error:", err));
