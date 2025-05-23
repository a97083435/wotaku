/**
 *  Copyright (c) 2024 taskylizard
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import z from 'zod'

export const FeedbackSchema = z.object({
  message: z.string().min(5).max(1000),
  type: z.enum([
    'submit',
    'update',
    'report',
    'suggestion',
    'appreciation',
    'other'
  ]),
  page: z.string().url(),
  // For heading based feedback
  heading: z.string().min(3).max(20).optional()
})

export interface Option {
  label: string
  value: FeedbackType['type']
}

export const feedbackOptions: Option[] = [
  {
    label: '➕ Submit link',
    value: 'submit'
  },
  {
    label: '❗️ Update link',
    value: 'update'
  },
  {
    label: '❌ Report bad / dead link',
    value: 'report'
  },
  {
    label: '💡 Suggest edit',
    value: 'suggestion'
  },
  {
    label: '❤️ Love the wiki',
    value: 'appreciation'
  },
  { label: '💬 Something else', value: 'other' }
]

export function getFeedbackOption(
  value: FeedbackType['type']
): Option | undefined {
  return feedbackOptions.find((option) => option.value === value)
}

export type FeedbackType = z.infer<typeof FeedbackSchema>
