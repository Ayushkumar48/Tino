import connectDB from "$lib/db";

export async function load() {
    await connectDB()
}