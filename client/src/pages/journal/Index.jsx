import React, { useState } from 'react';
import { MoonLoader } from 'react-spinners';

function Journal() {
  const [data, setData] = useState([
    {
      name: "Progressive Farmer",
      disc: "DTN/The Progressive Farmer is a country life oriented magazine, published twelve times a year by DTN, a division of Telvent. The magazine is based in Birmingham, Alabama.",
      link: "https://muckrack.com/media-outlet/dtnpf"
    },
    {
      name: "Successful Farming",
      disc: "The Successful Farming brand serves the diverse business, production, and family information needs of families who make farming and ranching their business. Our passion is to help them make money, save time, and grow their satisfaction in the farming business.",
      link: "https://muckrack.com/media-outlet/successful_farming"
    },
    {
      name: "Farm Journal",
      disc: "Farm Journal, the premiere U.S. farm magazine, is a prime source of practical information on crops, livestock and general agriculture for farm families. As the flagship of Farm Journal Media, Farm Journal has a rich history spanning more than 134 years of service to U.S. agriculture, quality journalism and innovations in circulation technology. Farm Journal was first published in March 1877 for farmers in bountiful agricultural regions within a day's ride of the publication's office in Philadelphia. Founder Wilmer Atkinson was a Quaker, farmer and journalist, who insisted that his publication disseminate common sense information to farmers and their wives. When Atkinson received approving letters from beyond the Middle Atlantic states, he began aggressively to seek national circulation. A publication that started with 25,000 copies grew to 1 million subscribers nationwide by 1915.",
      link: "https://muckrack.com/media-outlet/farm-journal"
    },
    {
      name: "Our Ohio",
      disc: "Our Ohio magazine connects consumers to agriculture through topics such as food, gardening, cooking, animals and events. Through captivating photography, engaging stories and tips for living closer to the land, Our Ohio invites readers to discover their inner farmer.",
      link: "https://muckrack.com/media-outlet/ofbf"
    },
    {
      name: "Modern Farmer",
      disc: "Founded in April 2013, Modern Farmer is a quarterly American magazine devoted to agriculture and food. The magazine is unique in that it attempts to have equally rural and urban readers,[3] and to appeal to the person who wants to romanticize farming and the person who is knee deep in turkey droppings, according to The New York Times. In 2014, the publication won the National Magazine Awards for the Magazine Section.",
      link: "https://muckrack.com/media-outlet/modernfarmer"
    },
    {
      name: "Top Producer",
      disc: "Top Producer is the only magazine devoted to the business of farming. The publication has often been called the 'Fortune' magazine of farming because it emphasizes profiles on the business leaders, entrepreneurs and innovators of U.S. agriculture. It is the authoritative resource on trends in marketing, economics, farm programs and policy, trade finance, taxes and management.",
      link: "https://muckrack.com/media-outlet/agweb-topproducer"
    },
    {
      name: "Hobby Farms",
      disc: "Hobby Farms is a bimonthly magazine, devoted to the life of hobby farmers, homesteaders and small producers. Its editorial offices are based in Lexington, Kentucky. Hobby Farms magazine's tagline is 'Rural Living for Pleasure and Profit'. The magazine is known for its award-winning design and photography.",
      link: "https://muckrack.com/media-outlet/hobbyfarms"
    }
  ]);

  return (
    <div className="w-container mx-auto">
      <h1 className='text-center font-DM font-extrabold text-lg mt-4'>Latest Journals</h1>
    {data ? (<>
      {data.map((item, index) => (
        <div className="my-8" key={index}>
          <h2 className="text-2xl font-semibold"><a  href={item.link} target="_blank">{item.name}</a></h2>
          <p className="text-gray-700 mt-2">{item.disc}</p>
        </div>
      ))}
    </>):<MoonLoader/>}
    </div>
  );
}

export default Journal;
