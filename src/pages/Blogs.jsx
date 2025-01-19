import React from "react";

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Importance of Regular Exercise for Health Tracking",
      content:
        "Regular exercise is a key component of any health-tracking routine. It helps improve cardiovascular health, maintain weight, and enhance mental well-being. Using fitness trackers can help you monitor your daily activity and set achievable goals.",
      author: "John Doe",
      date: "January 18, 2025",
      tag: "Fitness",
    },
    {
      id: 2,
      title: "How to Track Your Sleep for Better Recovery",
      content:
        "Sleep tracking provides valuable insights into your recovery and overall health. Learn how to use apps and devices to monitor your sleep patterns, ensuring you get enough deep and REM sleep for optimal performance.",
      author: "Jane Smith",
      date: "January 15, 2025",
      tag: "Sleep",
    },
    {
      id: 3,
      title: "Diet Tracking: Why Every Calorie Counts",
      content:
        "Tracking your diet helps maintain balanced nutrition and achieve weight management goals. Learn how to use diet-tracking apps to log your meals, monitor calorie intake, and analyze macronutrients.",
      author: "Emily Clark",
      date: "January 12, 2025",
      tag: "Nutrition",
    },
    {
        id: 4,
        title: "Diet Tracking: Why Every Calorie Counts",
        content:
          "Tracking your diet helps maintain balanced nutrition and achieve weight management goals. Learn how to use diet-tracking apps to log your meals, monitor calorie intake, and analyze macronutrients.",
        author: "Emily Clark",
        date: "January 12, 2025",
        tag: "Nutrition",
      },
      {
        id: 5,
        title: "Diet Tracking: Why Every Calorie Counts",
        content:
          "Tracking your diet helps maintain balanced nutrition and achieve weight management goals. Learn how to use diet-tracking apps to log your meals, monitor calorie intake, and analyze macronutrients.",
        author: "Emily Clark",
        date: "January 12, 2025",
        tag: "Nutrition",
      },
      {
        id: 6,
        title: "Diet Tracking: Why Every Calorie Counts",
        content:
          "Tracking your diet helps maintain balanced nutrition and achieve weight management goals. Learn how to use diet-tracking apps to log your meals, monitor calorie intake, and analyze macronutrients.",
        author: "Emily Clark",
        date: "January 12, 2025",
        tag: "Nutrition",
      },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Health Tracking Blogs
      </h1>
      <div className="grid grid-cols-3 md:grid-cols-1 lg:grid-cols-3 gap-10">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-blue-500">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                By {post.author} | {post.date}
              </p>
              <p className="text-gray-700 mb-4">{post.content.substring(0, 100)}...</p>
              <div className="flex justify-between items-center">
                <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  {post.tag}
                </span>
                <button className="text-sm text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
