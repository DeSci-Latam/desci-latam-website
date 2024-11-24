import { getCollection } from 'astro:content'
import type { Lang } from '@/i18n'

export const getCategories = async (locale: Lang) => {
	const posts = await getCollection('blog')
	const categories = new Set(
		posts
			.filter((post) => post.slug.split('/')[0] === locale)
			.map((post) => post.data.category)
	)
	return Array.from(categories)
}

export const getFundingCategories = async (locale: Lang) => {
	const posts = await getCollection('funding')
	const categories = new Set(
		posts
			.filter((post) => post.slug.split('/')[0] === locale)	
			.map((post) => post.data.category)
	)
	return Array.from(categories)
}

export const getPosts = async (max?: number, locale?: Lang) => {
	return (await getCollection('blog'))
		.filter((post) => !post.data.draft && (!locale || post.slug.split('/')[0] === locale))
		.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
		.slice(0, max)
}

export const getFundingPosts = async (max?: number, locale?: Lang) => {
	return (await getCollection('funding'))
		.filter((post) => !post.data.draft && (!locale || post.slug.split('/')[0] === locale))
		.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
		.slice(0, max)
}

export const getTags = async (locale: Lang) => {
	const posts = await getPosts(undefined, locale)
	const tags = new Set()
	posts.forEach((post) => {
		post.data.tags?.forEach((tag) => {
			tags.add(tag.toLowerCase())
		})
	})

	return Array.from(tags)
}

export const getPostByTag = async (tag: string, locale: Lang) => {
	const posts = await getPosts(undefined, locale)
	const lowercaseTag = tag.toLowerCase()
	return posts.filter((post) => {
		return post.data.tags?.some((postTag) => postTag.toLowerCase() === lowercaseTag)
	})
}

export const filterPostsByCategory = async (category: string, locale: Lang) => {
	const posts = await getPosts(undefined, locale)
	return posts.filter((post) => post.data.category.toLowerCase() === category.toLowerCase())
}

export const filterFundingPostsByCategory = async (category: string, locale: Lang) => {
	const posts = await getPosts(undefined, locale)
	return posts.filter((post) => post.data.category.toLowerCase() === category.toLowerCase())
}