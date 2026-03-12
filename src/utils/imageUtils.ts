export async function getAvatar({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName + " " + lastName)}`;
}
