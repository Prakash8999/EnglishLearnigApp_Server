import Prisma from "../client.js";

export const userDetail = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await Prisma.user.findFirst({
			where: {
				id: id
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