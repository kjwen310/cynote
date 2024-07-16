# Cynote

<p>
  Cynote is a SaaS for enhancing your team's productivity and collaboration, with the ultimate tool designed for seamless teamwork. Boost efficiency, streamline communication, and achieve your goals together with ease.
</p>
<p>
  Demo：<a  href="https://cynote.vercel.app/">Cynote</a>
</p>

<img width="1452" alt="Screenshot 2024-07-16 at 4 39 50 PM" src="https://github.com/user-attachments/assets/b470b817-c0d1-4246-a0fe-32bbb72e7c74">


## Technical Stack

- [Next.js](https://nextjs.org/) for main structure and framework
- [Supabase](https://supabase.com/) for database and authentication
- [Prisma](https://www.prisma.io/) for ORM
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) for state management
- [Tailwind](https://tailwindcss.com/) and [Shadcn/ui](https://ui.shadcn.com/) for CSS solutions
- [Stripe](https://stripe.com/) for financial infrastructure
- [BlockNote](https://www.blocknotejs.org/) for rich-text editor
- [hello-pangea/dnd](https://github.com/hello-pangea/dnd) for drag-and-drop features



## Feature

1. Allows the creation of workspaces and the invitation of other users for collaboration.
2. Enables the creation of notes and task lists.
3. Distinguishes between admin and member permissions, each able to perform specific CRUD operations.
4. Features responsive web design and can switch between light and dark modes.


> On the left side, you can select a workspace, or within a specific workspace panel, choose notes and tasks and set information.

<img width="1465" alt="Screenshot 2024-07-16 at 10 08 17 AM" src="https://github.com/user-attachments/assets/c2ce7a8f-6063-4924-bc08-5f2817f5c261">


> The notes area can be freely edited, with styles and usage similar to Notion.

<img width="1467" alt="Screenshot 2024-07-16 at 10 21 23 AM" src="https://github.com/user-attachments/assets/d2feaa93-d211-47d6-a728-6c779ddca56a">


> In the task area, you can add task lists and related cards, and drag them to reorder.

<img width="1457" alt="Screenshot 2024-07-16 at 10 20 06 AM" src="https://github.com/user-attachments/assets/17eca149-f6b5-4c96-9ebc-f9be89256d68">


> Simulated payment integration allows for workspace upgrades, enabling unlimited creation of notes and task lists after payment.

<img width="1366" alt="Screenshot 2024-07-16 at 4 40 30 PM" src="https://github.com/user-attachments/assets/7b5910ce-df91-4cf4-adc3-b596ac38572e">


## Collaboration

If you have any feedback, feel free to contact author or open a PR. 😀

---

## Project Setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
