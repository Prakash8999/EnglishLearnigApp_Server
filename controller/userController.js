import Prisma from "../client.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUser = async (req, res) => {

	try {
		const { name, email, password } = req.body

		const user = await Prisma.user.findFirst({
			where: {
				email: email
			}
		})
		if (user) return res.json({ success: false, message: "Email Already Exist" })

		const passwordHashed = await bcrypt.hash(password, 10)

		 await Prisma.user.create({
			data: {
				name: name,
				email: email,
				password: passwordHashed
			}
		})


	return	res.json({ success: true, message: "User Created Successfully." })
	} catch (error) {

		return res.json({ success: false, message: error })
	}

}



export const loginUser = async (req, res) => {
	try {

		const { email, password } = req.body
		const user = await Prisma.user.findFirst({
			where: {
				email: email
			}
		})
		if (!user) return res.status(400).json({ message: "Invalid email or password" })

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) return res.status(400).json({ message: "Invalid email or password" })
		const token = jwt.sign({ id: user.id, }, process.env.JWT_SECRET)
		delete user.password;
		return	res.json({ success: true, message: "Logged in Successfully.",  token  })
	

	} catch (error) {
	return	res.status(500).json({success: false, message: error })
	}
}

export const mangroves =( req,res) =>{
try {
	fetch("https://cbuelow.shinyapps.io/target-setting/")
			.then(response => {
				// Check if the response is successful (status code 200)
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				// Return the response body as text
				return response.text();
			})
			.then(content => {
				// Handle the document content
				// return content;
				return	res.json({ success: true, document: content})
	
			})
			.catch(error => {
				// Handle errors
				console.error('There was a problem with the fetch operation:', error);
			});
} catch (error) {
	console.log(error);
}

}

