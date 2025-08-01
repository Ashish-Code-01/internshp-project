import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const mockInterns = [
    {
        id: 1,
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        referralCode: "alex2025",
        totalRaised: 15750.50,
        totalDonations: 47,
        joinDate: "2024-01-15",
        rank: 3,
        achievements: ["First Donation", "Team Player", "Rising Star"],
        recentDonations: [
            { amount: 250, donor: "Anonymous", date: "2025-01-10" },
            { amount: 100, donor: "John Smith", date: "2025-01-09" },
            { amount: 500, donor: "Tech Corp", date: "2025-01-08" }
        ]
    },
    {
        id: 2,
        name: "Sarah Chen",
        email: "sarah.chen@example.com",
        referralCode: "sarah2025",
        totalRaised: 23400.25,
        totalDonations: 62,
        joinDate: "2024-01-10",
        rank: 1,
        achievements: ["First Donation", "Team Player", "Rising Star", "Top Performer", "Community Leader"],
        recentDonations: []
    },
    {
        id: 3,
        name: "Mike Rodriguez",
        email: "mike.rodriguez@example.com",
        referralCode: "mike2025",
        totalRaised: 18950.75,
        totalDonations: 53,
        joinDate: "2024-01-20",
        rank: 2,
        achievements: ["First Donation", "Team Player", "Rising Star", "Top Performer"],
        recentDonations: []
    },
    {
        id: 4,
        name: "Emma Wilson",
        email: "emma.wilson@example.com",
        referralCode: "emma2025",
        totalRaised: 12300.00,
        totalDonations: 38,
        joinDate: "2024-02-01",
        rank: 4,
        achievements: ["First Donation", "Team Player"],
        recentDonations: []
    },
    {
        id: 5,
        name: "David Kim",
        email: "david.kim@example.com",
        referralCode: "david2025",
        totalRaised: 9875.25,
        totalDonations: 29,
        joinDate: "2024-02-15",
        rank: 5,
        achievements: ["First Donation"],
        recentDonations: []
    }
];

const allAchievements = [
    { id: 1, name: "First Donation", description: "Raised your first donation", icon: "🎯", unlocked: true },
    { id: 2, name: "Team Player", description: "Collaborated with 5+ team members", icon: "🤝", unlocked: true },
    { id: 3, name: "Rising Star", description: "Raised over $10,000", icon: "⭐", unlocked: true },
    { id: 4, name: "Top Performer", description: "Ranked in top 3", icon: "🏆", unlocked: false },
    { id: 5, name: "Community Leader", description: "Raised over $20,000", icon: "👑", unlocked: false },
    { id: 6, name: "Marathon Runner", description: "100+ donations raised", icon: "🏃", unlocked: false }
];

// API Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/api/intern', (req, res) => {
    // Return the first intern as the logged-in user
    const intern = mockInterns[0];
    res.json(intern);
});

app.get('/api/intern/:id', (req, res) => {
    const internId = parseInt(req.params.id);
    const intern = mockInterns.find(i => i.id === internId);

    if (!intern) {
        return res.status(404).json({ error: 'Intern not found' });
    }

    res.json(intern);
});

app.get('/api/leaderboard', (req, res) => {
    const sortedInterns = [...mockInterns].sort((a, b) => b.totalRaised - a.totalRaised);
    res.json(sortedInterns);
});

app.get('/api/achievements', (req, res) => {
    const intern = mockInterns[0]; // Current user
    const achievements = allAchievements.map(achievement => ({
        ...achievement,
        unlocked: intern.achievements.includes(achievement.name)
    }));
    res.json(achievements);
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Mock authentication - just return success
    setTimeout(() => {
        res.json({
            success: true,
            user: mockInterns[0],
            token: 'mock-jwt-token'
        });
    }, 1000);
});

app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;

    // Mock signup - just return success
    setTimeout(() => {
        res.json({
            success: true,
            message: 'Account created successfully',
            user: {
                id: Date.now(),
                name,
                email,
                referralCode: `${name.toLowerCase().replace(/\s+/g, '')}2025`,
                totalRaised: 0,
                totalDonations: 0,
                rank: mockInterns.length + 1,
                achievements: []
            }
        });
    }, 1000);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});