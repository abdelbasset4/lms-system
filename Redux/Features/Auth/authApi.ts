import { apiSlice } from "../Api/ApiSlice";
import { useLogin, useLogout, useRegister } from "./authSlice";

type RegisterResponse = {
  message: string;
  token: string;
};

type RegisterData = {
  email: string;
  password: string;
  username: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterData>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            useRegister({
              token: result.data.token,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    activate: builder.mutation({
      query: ({ activate_token, activate_code }) => ({
        url: "/auth/activate-account",
        method: "POST",
        body: {
          activate_token,
          activate_code,
        },
        // credentials: 'include' as const
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            useLogin({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: "/auth/socialauth",
        method: "POST",
        body: {
          email,
          name,
          avatar,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            useLogin({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logOut: builder.query({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(data, { dispatch }) {
        try {
          dispatch(useLogout());
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivateMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogOutQuery,
} = authApi;
