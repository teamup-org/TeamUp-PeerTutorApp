'use server';

export default async function handler(req, res) {
  try {
    const response = await fetch('https://dummyjson.com/posts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 0,
        name: 'Kyle Lang',
        pfp_url: '',
        hourly_rate: 14,
        rating: 4,
        rating_count: 12,
        title: 'Texas A&M CSCE Tutor',
        courses: [{id: 0, course: 'CSCE410'}, {id: 1, course: 'CSCE420'}],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      })
    })
    const data = await response.json();
    res.status(200).json(data);
    console.log(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
}
  