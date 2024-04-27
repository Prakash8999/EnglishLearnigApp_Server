import Prisma from "../client.js";

export const createStory = async (req, res) => {
	try {
		const { story, userId , charname, isPredefined, imageurl,title} = req.body


		const createStoryObj = await Prisma.userstory.create({
			data: {
				authorId: userId,
				story: story,
				chats: [],
				charname:charname,
				isPredefined:isPredefined,
				imageurl:imageurl,
				title:title
			}
		})
		return res.status(200).json({ message: 'Story Added', createStoryObj });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}


export const createStories = async (req, res) => {
	try {
	  const { userId, stories } = req.body;
	  const createdStories = [];
  
	  for (const story of stories) {
		const { story: storyContent, charname, isPredefined, imageurl, title } = story;

		console.log(charname);
  
		const createStoryObj = await Prisma.userstory.create({
		  data: {
			authorId: userId,
			story: storyContent,
			chats: [],
			charname: charname,
			isPredefined: isPredefined,
			imageurl: imageurl,
			title: title
		  }
		});
  
		createdStories.push(createStoryObj);
	  }
  
	  return res.status(200).json({ message: 'Stories Added', createdStories });
	} catch (error) {
	  return res.status(500).json({ message: error.message });
	}
  };
  










export const createChat = async (req, res) => {
	try {
		const { id, text, isUser, charname } = req.body;
		// console.log(text);
		console.log(id);

		const createChatObj = await Prisma.userstory.update({
			where: {
				id: id
			},
			data: {
				chats: {
					push: {
						text: text,
						isUser: isUser,
						charname:charname,
					
					}
				}
			}
		})

		return res.status(200).json({ message: 'Chat added to the story', createChatObj });
	} catch (error) {
		console.error('Error adding chat to story:', error);
		return res.status(500).json({ message: error.message });
	}
}


export const getstory = async (req, res) => {
	try {
		const findstory = await Prisma.userstory.findMany({
			where: {
				authorId: req.user.id.toString()
			}
		})
		return res.status(200).json({ message: 'story found successfully', findstory });

	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}


export const getsingleStory = async (req, res) =>{
	const { id } = req.params
	try {
		const findstory = await Prisma.userstory.findFirst({
			where: {
				id: id
			}
		})
		return res.status(200).json({ message: 'single story found successfully', findstory });

	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
} 