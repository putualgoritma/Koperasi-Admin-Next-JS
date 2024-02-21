'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth/next"
import { options } from "@/app/api/auth/[...nextauth]/options"

export async function createInvoice(formData: FormData) {
  const session = await getServerSession(options)
  // Insert data into the database
  try {
    await fetch(process.env.BASE_HOST + process.env.API_USER_STORE, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + session.user.token,
      },
      body: JSON.stringify(FormData)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("iniiiii dataaa : ", data);
      });
  } catch (error) {
    console.log("ini error ", error);
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  const res = await fetch(qry, {
    cache: 'no-store', method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + session.user.token,
      'content-type': 'application/json',
    }
  }).then((res) => res.json())
    .then((data) => {
      return data.data;
    })
  return res;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');


}
