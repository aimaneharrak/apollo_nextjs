"use client";

import { useEffect, useRef, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'

import Head from 'next/head'
import { Button, Container, Grid, Input, Spacer, User, Row, Loading } from "@nextui-org/react"

import GET_USERS from '@/graphql/queries/getUsers.gql'
import SEARCH_USERS from '@/graphql/queries/searchUser.gql'

export default function Home() {
  const [users, setUsers] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const usersRef = useRef(null)

  const { data, loading, error } = useQuery(GET_USERS)

  const [getSearchedUsers] = useLazyQuery(SEARCH_USERS, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      setUsers(data.searchUser)
    }
  })

  useEffect(() => {
    if (data) {
      setUsers(data.users)
      usersRef.current = data.users
    }
  }, [data])


  const searchUser = () => {
    getSearchedUsers({
      variables: {
        value: searchValue
      }
    })
  }

  if (error) {
    console.error(error)
    return null
  }

  return (
    <>
      <Head>
        <title>Nextjs and Graphql Setup</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

        <Container css={{ display: 'flex', justifyContent: 'center' }}>
          <Spacer y={2.5} />
          <Row justify="center" align="center">

            <Input
              clearable
              labelPlaceholder="User"
              onClearClick={() => setUsers(usersRef.current)}
              initialValue={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button color="gradient" auto onClick={() => searchUser()}>
              Search user
            </Button>
          </Row>

          <Spacer y={2.5} />
          <Row justify="center" align="center">

            {loading
              ?
              <Loading />
              :
              <Grid.Container gap={2} justify="center">
                {users.map(u => (
                  <Grid xs={3}
                    key={u.id}
                  >
                    <User
                      src={u.image}
                      name={`${u.firstName}${u.lastName}`}
                      description={u.email}
                      size="lg"
                      bordered
                      color="gradient"
                    />
                  </Grid>

                ))
                }
              </Grid.Container>
            }

          </Row>
        </Container>
      </main>
    </>
  )
}