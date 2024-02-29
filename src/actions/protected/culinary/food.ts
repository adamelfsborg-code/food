"use server";

import {
  FoodAddResponseSchema,
  FoodCreateDtoSchema,
  FoodDeleteDtoSchema,
  FoodDeleteResponseSchema,
  FoodEditDtoSchema,
  FoodEditResponseSchema,
  FoodExtendedResponseSchema,
  FoodFilterDtoSchema,
  FoodPaginationDtoSchema,
  FoodTableSchema,
} from "@/lib/schema/food";
import { parsedEnv } from "@/lib/schema/env";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const ListFoodsAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const foodSchema = FoodPaginationDtoSchema.safeParse(props);

  if (!foodSchema.success)
    return {
      success: false,
      error: foodSchema.error.message,
    };
  
  const response = await fetch(`${parsedEnv.API_CULINARY_ADDR}/foods/list?pageIndex=${foodSchema.data.pageIndex}&pageSize=${foodSchema.data.pageSize}`, {
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
  const responseSchema = FoodExtendedResponseSchema.safeParse(result);
  if (!responseSchema.success) {
    return {
      success: false,
      error: responseSchema.error.message,
    };
  }

  return {
    success: true,
    foods: { 
      rows: responseSchema.data.rows || [],
      pagination: responseSchema.data.pagination
    },
  };
};

export const GetFoodAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const foodchema = FoodFilterDtoSchema.safeParse(props);

  if (!foodchema.success)
    return {
      success: false,
      error: foodchema.error.message,
    };

  const response = await fetch(
    `${parsedEnv.API_CULINARY_ADDR}/foods/${foodchema.data.id}`,
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
  const responseSchema = FoodTableSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  return {
    success: true,
    food: responseSchema.data,
  };
};

export const AddFoodAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const foodchema = FoodCreateDtoSchema.safeParse(props);

  if (!foodchema.success)
    return {
      success: false,
      error: foodchema.error.message,
    };

  const response = await fetch(`${parsedEnv.API_CULINARY_ADDR}/foods`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: foodchema.data.name,
      foodtype: foodchema.data.foodtype,
      brand: foodchema.data.brand,
      kcal: foodchema.data.kcal,
      protein: foodchema.data.protein,
      carbs: foodchema.data.carbs,
      fat: foodchema.data.fat,
      saturated: foodchema.data.saturated,
      unsaturated: foodchema.data.unsaturated,
      fiber: foodchema.data.fiber,
      sugars: foodchema.data.sugars,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    return {
      success: false,
      error: message,
    };
  }

  const result = await response.json();
  const responseSchema = FoodAddResponseSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  revalidatePath("/culinary/foods", "page");

  return {
    success: true,
    message: responseSchema.data.message,
  };
};

export const EditFoodAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const foodchema = FoodEditDtoSchema.safeParse(props);

  if (!foodchema.success)
    return {
      success: false,
      error: foodchema.error.message,
    };

  const response = await fetch(
    `${parsedEnv.API_CULINARY_ADDR}/foods/${foodchema.data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: foodchema.data.name,
        foodtype: foodchema.data.foodtype,
        brand: foodchema.data.brand,
        kcal: foodchema.data.kcal,
        protein: foodchema.data.protein,
        carbs: foodchema.data.carbs,
        fat: foodchema.data.fat,
        saturated: foodchema.data.saturated,
        unsaturated: foodchema.data.unsaturated,
        fiber: foodchema.data.fiber,
        sugars: foodchema.data.sugars,
      }),
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
  const responseSchema = FoodEditResponseSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  revalidatePath("/culinary/foods", "page");

  return {
    success: true,
    message: responseSchema.data.message,
  };
};

export const DeleteFoodAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const foodchema = FoodDeleteDtoSchema.safeParse(props);

  if (!foodchema.success)
    return {
      success: false,
      error: foodchema.error.message,
    };

  const response = await fetch(
    `${parsedEnv.API_CULINARY_ADDR}/foods/${foodchema.data.id}`,
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
  const responseSchema = FoodDeleteResponseSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  revalidatePath("/culinary/foods", "page");

  return {
    success: true,
    message: responseSchema.data.message,
  };
};
