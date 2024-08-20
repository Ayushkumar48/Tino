import { dynamoClient, TableName } from '$lib/DynamoDB';

export async function GET({ url }) {
	const params = {
		TableName,
		Key: {
			ParticipatingNumbers: url.searchParams.get('participatingNumbers')
		}
	};
	const messages = await dynamoClient.scan(params).promise();
	return new Response(
		JSON.stringify({
			messages
		})
	);
}
