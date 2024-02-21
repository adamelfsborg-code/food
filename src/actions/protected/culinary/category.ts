"use server";

import {
  CategoryAddResponseSchema,
  CategoryCreateDtoSchema,
  CategoryDeleteDtoSchema,
  CategoryEditDtoSchema,
  CategoryFilterDtoSchema,
  CategoryTableSchema,
  CategoryDeleteResponseSchema,
  CategoryEditResponseSchema,
  CategoryGetResponseSchema,
} from "@/lib/schema/category";
import { parsedEnv } from "@/lib/schema/env";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const ListCategoriesAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const response = await fetch(
    `${parsedEnv.API_CULINARY_ADDR}/categories/list`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const message = await response.text();
    return {
      success: false,
      error: message,
    };
  }

  const result = await response.json();
  const responseSchema = CategoryGetResponseSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  return {
    success: true,
    categories: responseSchema.data,
  };
};

export const GetCategoryAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const categorySchema = CategoryFilterDtoSchema.safeParse(props);

  if (!categorySchema.success)
    return {
      success: false,
      error: categorySchema.error.message,
    };

  const response = await fetch(
    `${parsedEnv.API_CULINARY_ADDR}/categories/${categorySchema.data.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const message = await response.text();
    return {
      success: false,
      error: message,
    };
  }

  const result = await response.json();
  const responseSchema = CategoryTableSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  return {
    success: true,
    category: responseSchema.data,
  };
};

export const AddCategoryAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const categorySchema = CategoryCreateDtoSchema.safeParse(props);

  if (!categorySchema.success)
    return {
      success: false,
      error: categorySchema.error.message,
    };

  const response = await fetch(`${parsedEnv.API_CULINARY_ADDR}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: categorySchema.data.name }),
  });

  if (!response.ok) {
    const message = await response.text();
    return {
      success: false,
      error: message,
    };
  }

  const result = await response.json();
  const responseSchema = CategoryAddResponseSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  revalidatePath("/culinary/categories", "page");

  return {
    success: true,
    message: responseSchema.data.message,
  };
};

export const EditCategoryAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const categorySchema = CategoryEditDtoSchema.safeParse(props);

  if (!categorySchema.success)
    return {
      success: false,
      error: categorySchema.error.message,
    };

  const response = await fetch(
    `${parsedEnv.API_CULINARY_ADDR}/categories/${categorySchema.data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: categorySchema.data.name }),
    }
  );

  if (!response.ok) {
    const message = await response.text();
    return {
      success: false,
      error: message,
    };
  }

  const result = await response.json();
  const responseSchema = CategoryEditResponseSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  revalidatePath("/culinary/categories", "page");

  return {
    success: true,
    message: responseSchema.data.message,
  };
};

export const DeleteCategoryAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const categorySchema = CategoryDeleteDtoSchema.safeParse(props);

  if (!categorySchema.success)
    return {
      success: false,
      error: categorySchema.error.message,
    };

  const response = await fetch(
    `${parsedEnv.API_CULINARY_ADDR}/categories/${categorySchema.data.id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const message = await response.text();
    return {
      success: false,
      error: message,
    };
  }

  const result = await response.json();
  const responseSchema = CategoryDeleteResponseSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  revalidatePath("/culinary/categories", "page");

  return {
    success: true,
    message: responseSchema.data.message,
  };
};
