
import { User, UserRole } from "../types";

// Mock user database
const MOCK_USERS: User[] = [
  {
    id: 'u-1',
    name: 'Dr. John Doe',
    email: 'author@dspg.edu.ng',
    role: UserRole.AUTHOR,
    institution: 'Delta State Polytechnic',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=JD'
  },
  {
    id: 'u-2',
    name: 'Prof. Emmanuel Achu',
    email: 'editor@dspg.edu.ng',
    role: UserRole.EDITOR,
    institution: 'DSPG',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=EA'
  }
];

export const login = async (email: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email === email);
      if (user) {
        resolve(user);
      } else {
        // Auto-register mock for demo if not found
        resolve({
          id: `u-${Date.now()}`,
          name: email.split('@')[0],
          email: email,
          role: UserRole.AUTHOR,
          institution: 'Unknown',
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`
        });
      }
    }, 800);
  });
};

export const logout = async (): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, 500));
};
