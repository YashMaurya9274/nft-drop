import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'

interface Props {
  collections: Collection[]
}

// background-color: #0093E9;
// background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);

const Home = ({ collections }: Props) => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col py-20 px-10 2xl:px-0">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="mb-10 text-4xl font-extralight">
        The{' '}
        <span className="font-extrabold underline decoration-pink-600/50">
          YASHM
        </span>{' '}
        NFT Market Place
      </h1>

      <main className="bg-gradient-to-r from-[#0093E9] to-[#80D0C7] p-10 shadow-xl shadow-slate-600">
        <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {collections.map((collection) => (
            <Link key={collection._id} href={`/nft/${collection.slug.current}`}>
              <div className="flex cursor-pointer flex-col items-center transition-all duration-200 hover:scale-105">
                <img
                  className="h-96 w-60 rounded-2xl object-cover"
                  src={urlFor(collection.mainImage).url()}
                  alt=""
                />

                <div className="p-5">
                  <h2 className="text-3xl">{collection.title}</h2>
                  <p className="mt-2 text-sm text-white">
                    {collection.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
      asset
    },
    previewImage {
      asset
    },
    slug {
      current
    },
    creator -> {
      _id,
      name,
      address,
      slug {
        current
      }
    }
  }`

  const collections = await sanityClient.fetch(query)

  return {
    props: {
      collections,
    },
  }
}
