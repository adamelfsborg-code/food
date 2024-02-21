"use server";

import {
  FoodTypeAddResponseSchema,
  FoodTypeCreateDtoSchema,
  FoodTypeDeleteDtoSchema,
  FoodTypeDeleteResponseSchema,
  FoodTypeEditDtoSchema,
  FoodTypeEditResponseSchema,
  FoodTypeFilterDtoSchema,
  FoodTypeGetResponseSchema,
  FoodTypeTableSchema,
} from "@/lib/schema/foodtype";
import { parsedEnv } from "@/lib/schema/env";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const ListFoodTypesAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const response = await fetch(`${parsedEnv.API_CULINARY_ADDR}/foodtypes/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    return {
      success: false,
      error: message,
    };
  }

  const result = await response.json();
  const responseSchema = FoodTypeGetResponseSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  return {
    success: true,
    foodtypes: responseSchema.data || [],
  };
};

export const GetFoodTypeAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const foodTypeSchema = FoodTypeFilterDtoSchema.safeParse(props);

  if (!foodTypeSchema.success)
    return {
      success: false,
      error: foodTypeSchema.error.message,
    };

  const response = await fetch(
    `${parsedEnv.API_CULINARY_ADDR}/foodtypes/${foodTypeSchema.data.id}`,
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
  const responseSchema = FoodTypeTableSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  return {
    success: true,
    foodtype: responseSchema.data,
  };
};

export const AddFoodTypeAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const foodtypeschema = FoodTypeCreateDtoSchema.safeParse(props);

  if (!foodtypeschema.success)
    return {
      success: false,
      error: foodtypeschema.error.message,
    };

  const response = await fetch(`${parsedEnv.API_CULINARY_ADDR}/foodtypes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: foodtypeschema.data.name, category: foodtypeschema.data.category }),
  });

  if (!response.ok) {
    const message = await response.text();
    return {
      success: false,
      error: message,
    };
  }

  const result = await response.json();
  const responseSchema = FoodTypeAddResponseSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  revalidatePath("/culinary/foodtypes", "page");

  return {
    success: true,
    message: responseSchema.data.message,
  };
};

export const EditFoodTypeAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const foodtypeschema = FoodTypeEditDtoSchema.safeParse(props);

  if (!foodtypeschema.success)
    return {
      success: false,
      error: foodtypeschema.error.message,
    };

  const response = await fetch(
    `${parsedEnv.API_CULINARY_ADDR}/foodtypes/${foodtypeschema.data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: foodtypeschema.data.name, category: foodtypeschema.data.category }),
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
  const responseSchema = FoodTypeEditResponseSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  revalidatePath("/culinary/foodtypes", "page");

  return {
    success: true,
    message: responseSchema.data.message,
  };
};

export const DeleteFoodTypeAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const foodtypeschema = FoodTypeDeleteDtoSchema.safeParse(props);

  if (!foodtypeschema.success)
    return {
      success: false,
      error: foodtypeschema.error.message,
    };

  const response = await fetch(
    `${parsedEnv.API_CULINARY_ADDR}/foodtypes/${foodtypeschema.data.id}`,
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
  const responseSchema = FoodTypeDeleteResponseSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  revalidatePath("/culinary/foodtypes", "page");

  return {
    success: true,
    message: responseSchema.data.message,
  };
};
