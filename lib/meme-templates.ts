export const memeTemplates = [
  {
    id: '181913649',
    url: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79',
    name: 'Professional Headshot'
  },
  {
    id: '87743020',
    url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a',
    name: 'Funny Dog'
  },
  {
    id: '438680',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
    name: 'Cat Face'
  },
  {
    id: '100777631',
    url: 'https://images.unsplash.com/photo-1525253013412-55c1a69a5738',
    name: 'Surprised Monkey'
  },
  {
    id: '61579',
    url: 'https://images.unsplash.com/photo-1501820488136-72669149e0d4',
    name: 'Office Life'
  }
];

export const aiCaptionTemplates = [
  "When you {action} but {consequence}",
  "Nobody:\nAbsolutely nobody:\nMe: {action}",
  "That moment when {situation}",
  "{subject}: exists\nMe: {reaction}",
  "How it started vs how it's going",
  "Plot twist: {unexpected}",
  "{subject} be like: {action}",
  "Me pretending to {action} while actually {reality}",
  "POV: {situation}",
  "Year {year}: {prediction}"
];

export const generateAICaptions = (count: number): string[] => {
  const captions: string[] = [];
  const actions = ['working', 'sleeping', 'coding', 'eating', 'scrolling'];
  const subjects = ['cats', 'developers', 'managers', 'coffee', 'meetings'];
  const situations = ['Monday morning', 'deadline approaching', 'after lunch', 'during meetings'];
  
  for (let i = 0; i < count; i++) {
    const template = aiCaptionTemplates[Math.floor(Math.random() * aiCaptionTemplates.length)];
    let caption = template
      .replace('{action}', actions[Math.floor(Math.random() * actions.length)])
      .replace('{subject}', subjects[Math.floor(Math.random() * subjects.length)])
      .replace('{situation}', situations[Math.floor(Math.random() * situations.length)]);
    
    captions.push(caption);
  }
  
  return captions;
};