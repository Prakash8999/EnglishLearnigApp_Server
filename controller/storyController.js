import Prisma from "../client.js";

export const createStory = async (req, res) => {
	try {
		const { story } = req.body

		const createStoryObj = await Prisma.userstory.create({
			data: {
				story: story,
				chats: [],
			}
		})
		return res.status(200).json({ message: 'Chat added to the story', createStoryObj });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

export const createChat = async (req, res) => {
	try {
		const { id, text, isUser } = req.body;

		const createChatObj = await Prisma.userstory.update({
			where: {
				id: id
			},
			data: {
				chats: {
					push: {
						text: text,
						isUser: isUser
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