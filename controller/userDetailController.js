import Prisma from "../client.js";

export const userDetail = async (req, res) => {
	try {
	const user = await Prisma.user.findFirst({
			where: {
				id: req.user.id.toString()
			},
			select: {
				name: true,
				email: true,
				id: true
			}
		})




		return res.status(200).json({ message: "User Found Successfully", success: true, user })

	} catch (error) {
		res.status(404).json({ message: error, success: false })
	}
}


export const updateUser = async (req, res) => {
	try {
		const { name, email, profilePic, id } = req.body
		const updateUser = await Prisma.user.update({
			where: {
				id: id
			},
			data: {
				email: email,
				name: name,
				profilePic: profilePic
			}
		})
		return res.status(200).json({ message: "User Updated Successfully", success: true, updateUser })
	} catch (error) {
		res.status(404).json({ message: error, success: false })
	}
}