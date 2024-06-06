import React from 'react';

const tasks = [
  {
    id: '0',
    task: 'Follow our Twitter',
    xp: 1000,
    link: 'https://x.com/intent/follow?screen_name=GuruCatMeme',
    buttonText: 'Follow'
  },
  {
    id: '1',
    task: 'Like our Tweet',
    xp: 500,
    link: 'https://x.com/intent/like?tweet_id=1793258061504610427',
    buttonText: 'Like'
  },
  {
    id: '2',
    task: 'Retweet our Tweet',
    xp: 500,
    link: 'https://x.com/intent/retweet?tweet_id=1793258061504610427',
    buttonText: 'Retweet'
  },
  {
    id: '3',
    task: 'Retweet our Tweet',
    xp: 500,
    link: 'https://x.com/intent/retweet?tweet_id=1793258061504610427',
    buttonText: 'Retweet'
  },
  {
    id: '4',
    task: 'Retweet our Tweet',
    xp: 500,
    link: 'https://x.com/intent/retweet?tweet_id=1793258061504610427',
    buttonText: 'Retweet'
  },
  {
    id: '5',
    task: 'Retweet our Tweet',
    xp: 500,
    link: 'https://x.com/intent/retweet?tweet_id=1793258061504610427',
    buttonText: 'Retweet'
  },
  // Add more tasks as needed
];

const Tasks = () => {
  return (
    <div className="tasks-page container mx-auto p-4">
      <h2 className="text-black text-2xl font-bold mb-4">Tasks</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="text-black py-2 px-4 border-b">Task</th>
            <th className="text-black py-2 px-4 border-b">XP</th>
            <th className="text-black py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td className="text-black py-2 px-4 border-b">{task.task}</td>
              <td className="text-black py-2 px-4 border-b">{task.xp} XP</td>
              <td className="text-black py-2 px-4 border-b">
                <a
                  href={task.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {task.buttonText}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
