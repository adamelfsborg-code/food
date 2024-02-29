"use server";

import {
  BrandAddResponseSchema,
  BrandCreateDtoSchema,
  BrandDeleteDtoSchema,
  BrandDeleteResponseSchema,
  BrandEditDtoSchema,
  BrandEditResponseSchema,
  BrandExtendedResponseSchema,
  BrandFilterDtoSchema,
  BrandGetResponseSchema,
  BrandPaginationDtoSchema,
  BrandTableSchema,
} from "@/lib/schema/brand";
import { parsedEnv } from "@/lib/schema/env";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const ListBrandsAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const brandSchema = BrandPaginationDtoSchema.safeParse(props);

  if (!brandSchema.success)
    return {
      success: false,
      error: brandSchema.error.message,
    };

  const response = await fetch(`${parsedEnv.API_CULINARY_ADDR}/brands/list?pageIndex=${brandSchema.data.pageIndex}&pageSize=${brandSchema.data.pageSize}`, {
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
  const responseSchema = BrandExtendedResponseSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  return {
    success: true,
    brands: { 
      rows: responseSchema.data.rows || [],
      pagination: responseSchema.data.pagination
    },
  };
};

export const GetBrandAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const brandSchema = BrandFilterDtoSchema.safeParse(props);

  if (!brandSchema.success)
    return {
      success: false,
      error: brandSchema.error.message,
    };

  const response = await fetch(
    `${parsedEnv.API_CULINARY_ADDR}/brands/${brandSchema.data.id}`,
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
  const responseSchema = BrandTableSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  return {
    success: true,
    brand: responseSchema.data,
  };
};

export const AddBrandAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const brandSchema = BrandCreateDtoSchema.safeParse(props);

  if (!brandSchema.success)
    return {
      success: false,
      error: brandSchema.error.message,
    };

  const response = await fetch(`${parsedEnv.API_CULINARY_ADDR}/brands`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: brandSchema.data.name }),
  });

  if (!response.ok) {
    const message = await response.text();
    return {
      success: false,
      error: message,
    };
  }

  const result = await response.json();
  const responseSchema = BrandAddResponseSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  revalidatePath("/culinary/brands", "page");

  return {
    success: true,
    message: responseSchema.data.message,
  };
};

export const EditBrandAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const brandSchema = BrandEditDtoSchema.safeParse(props);

  if (!brandSchema.success)
    return {
      success: false,
      error: brandSchema.error.message,
    };

  const response = await fetch(
    `${parsedEnv.API_CULINARY_ADDR}/brands/${brandSchema.data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: brandSchema.data.name }),
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
  const responseSchema = BrandEditResponseSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  revalidatePath("/culinary/brands", "page");

  return {
    success: true,
    message: responseSchema.data.message,
  };
};

export const DeleteBrandAPI = async (props: unknown) => {
  const token = cookies().get("X-USER-ID")?.value;

  if (!token)
    return {
      success: false,
      error: "Not authenticated",
    };

  const brandSchema = BrandDeleteDtoSchema.safeParse(props);

  if (!brandSchema.success)
    return {
      success: false,
      error: brandSchema.error.message,
    };

  const response = await fetch(
    `${parsedEnv.API_CULINARY_ADDR}/brands/${brandSchema.data.id}`,
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
  const responseSchema = BrandDeleteResponseSchema.safeParse(result);

  if (!responseSchema.success)
    return {
      success: false,
      error: responseSchema.error.message,
    };

  revalidatePath("/culinary/brands", "page");

  return {
    success: true,
    message: responseSchema.data.message,
  };
};
