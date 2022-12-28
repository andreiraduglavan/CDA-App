import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { doc, getDoc } from 'firebase/firestore';
import { getCurrentUser } from '../../firebase';
import { db } from '../../firebase/firebaseApp';


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    fetchCurrentUser: builder.query({
      async queryFn() {
        try {
          const { uid } = getCurrentUser()
          const docRef = doc(db, "users", uid)
          const snapshot = await getDoc(docRef)
          return { id: snapshot.id, ...snapshot.data() }
        } catch (error) {
          return { error }
        }
      },
      providesTags: ["user"],
    }),
  })
})


export const { usefetchCurrentUserQuery } = userApi